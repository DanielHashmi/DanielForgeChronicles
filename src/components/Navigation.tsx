'use client'
import { useStore } from "@/context/context";
import { Heading } from "@/types/interfaces";
import { useEffect, useState } from "react";

const Navigation = ({ html_file_content }: { html_file_content: string }) => {
    const { show_Navigator } = useStore();
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeLink, setActiveLink] = useState<string>("");

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

    const handleLinkClick = (id: string) => {
        setActiveLink(id);
    };

    useEffect(() => {
        const onScroll = () => {
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

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [headings]);

    return (
        <div className={`w-[18vw] h-[50vh] min-w-[15rem] max-w-[17rem] duration-500 transition-all flex bg-[#0000001d] border border-[#414141] rounded-sm flex-col gap-3 fixed top-40 p-6 z-40 backdrop-blur-3xl ${show_Navigator === true ? 'left-8 xl:left-[77%]' : 'left-[-17rem] xl:left-[77%]'}`}>
            <h3 className="font-bold text-xl text-nowrap">Content Navigation</h3>
            {headings.map((heading: Heading, index: number) => (
                <div key={index} className={`${heading.type === 'h2' ? 'ml-4 text-gray-500 text-sm' : ''}`}>
                    <a
                        href={`#${heading.id}`}
                        className={`cursor-pointer hover:underline ${activeLink === heading.id ? 'font-bold text-white' : ''}`}
                        onClick={(e) => handleLinkClick(heading.id)}
                    >
                        {heading.text[0].toUpperCase() + heading.text.slice(1)}
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Navigation;
