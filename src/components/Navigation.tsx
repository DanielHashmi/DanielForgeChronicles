'use client'
import { useStore } from "@/context/context";
import { Heading } from "@/types/interfaces";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";

const Navigation = ({ html_file_content }: { html_file_content: string }) => {
    const { show_Navigator } = useStore();
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeLink, setActiveLink] = useState<string>("");
    const onScroll = useRef<() => void>();

    useEffect(() => {
        const temp_div = document.createElement('div');
        temp_div.innerHTML = html_file_content;

        const all_headings = Array.from(temp_div.querySelectorAll('h1, h2')).map(el => ({
            type: el.tagName.toLowerCase() as 'h1' | 'h2',
            text: el.textContent || '',
            id: el.id,
        }));

        setHeadings(all_headings);
    }, [html_file_content]);

    const handleLinkClick = useCallback((id: string) => {
        setActiveLink(id);
    }, []);

    useEffect(() => {
        onScroll.current = () => {
            headings.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                        setActiveLink(heading.id);
                    }
                }
            });
        };

        const handleScroll = () => onScroll.current && onScroll.current();
        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchmove', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchmove', handleScroll);
        };
    }, [headings]);

    const navigationClass = useMemo(() =>
        `font-sans w-[18vw] h-[50vh] min-w-[15rem] max-w-[17rem] duration-500 transition-all flex bg-[#ffffffd4] xl:bg-[#0000000f] shadow-[0_0_5px_4px_#00000017] rounded-sm flex-col fixed top-40 z-40 backdrop-blur-3xl ${show_Navigator ? 'left-8 xl:left-[77%]' : 'left-[-17rem] xl:left-[77%]'}`
        , [show_Navigator]);

    return (
        <div className={navigationClass}>
            <h3 className="font-bold text-xl px-6 pb-6 pt-4 text-nowrap">Content Navigation</h3>
            <div className="overflow-y-auto px-6 mb-4 gap-3 flex flex-col">
                {headings.length === 0 ? <div>No Headings!</div> : headings.map((heading: Heading, index: number) => (
                    <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`cursor-pointer smooth ${heading.type === 'h2' ? 'ml-4 opacity-50' : ''} ${activeLink === heading.id ? 'scale-105 opacity-[1_!important]' : ''}`}
                        onClick={() => handleLinkClick(heading.id)}
                    >
                        {heading.text[0].toUpperCase() + heading.text.slice(1)}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Navigation;
