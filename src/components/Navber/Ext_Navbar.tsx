'use client';
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import Link from "next/link";
import { usePathname } from "next/navigation";

const Ext_Navbar = () => {
    const buttons = ['React-Tilt', 'Regex', 'Redux-ToolKit', 'AOS-Scroll', 'NextAuth', 'Redux', 'React', 'Tailwind-CSS-Setup',];
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);
    const [isDraggable, setIsDraggable] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
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
                className={`w-[50rem] sm:w-[70rem] md:w-[90vw] flex justify-around p-2 font-bold text-sm lg:text-base`}>
                {buttons.map((button, index) => (
                    <Link href={`/resource/blog/${button}`} key={index}
                        className={`hover:underline cursor-pointer
                        ${pathName.endsWith(`/${button}`) && 'underline'}`}>
                        {button}
                    </Link>
                ))}
            </motion.div>
        </div>
    );
};

export default Ext_Navbar;
