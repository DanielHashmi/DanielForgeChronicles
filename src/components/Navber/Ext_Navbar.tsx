'use client';
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/utils/client";

const Ext_Navbar = () => {
    const [buttons, setButtons] = useState<{ slug: string; name: string }[]>([])
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);
    const [isDraggable, setIsDraggable] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        const updateButtons = async () => {
            const data = await client.fetch(`*[_type == 'blogpost']{'slug':slug.current,name}`);
            if (window.innerWidth < 768) {
                setButtons(data);
            } else {
                setButtons(data.slice(0, 10));
            }
        };
        updateButtons();

        const handleResize = () => {
            if (scrollRef.current) {
                setWidth(scrollRef.current.scrollWidth - scrollRef.current.offsetWidth);
            }
            setIsDraggable(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={scrollRef} className="w-[90vw] mt-4 overflow-hidden bg-[#00000005]">
            <motion.div
                drag={isDraggable ? 'x' : false}
                dragConstraints={scrollRef.current ? { left: -width, right: 0 } : undefined}
                className={`w-[50rem] sm:w-[70rem] md:w-[90vw] flex justify-around items-center p-2 font-bold text-sm lg:text-base`}>

                {/* loading */}
                {!buttons.length && [...Array(10)].map((_, i) => (
                    <div key={i} className="w-14 h-5 rounded-full bg-[#8e8e8e4d] animate-pulse"></div>
                ))}

                {buttons.map((button, index) => (
                    <Link href={`/resource/blog/${button.slug}`} key={index}
                        className={`hover:underline cursor-pointer
                        ${pathName.endsWith(`/${button.slug}`) && 'underline'}`}>
                        {button.name}
                    </Link>
                ))}
            </motion.div>
        </div>
    );
};

export default Ext_Navbar;
