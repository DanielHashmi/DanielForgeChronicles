'use client'
import { useStore } from "@/context/context";
import { useTheme } from "next-themes";
import Image from "next/image"
import { MouseEvent } from "react";

const ToolBar = () => {
    const { setShow_Navigator, show_Navigator } = useStore();
    const { theme } = useTheme()
    const tools = [
        '/edit-2.svg',
        '/book-opened.svg',
        '/bookmark.svg',
        '/paperclip.svg',
        '/align-right.svg'
    ]

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).dataset.src === '/align-right.svg') {
            setShow_Navigator(!show_Navigator);
        }
    }

    return (
        <div className="fixed bottom-2 dark:bg-[#232323] bg-white z-40 translate-x-[-50%] left-[50%] p-2 shadow1 flex gap-6 rounded-sm">
            {tools.map((tool, index) => {
                return (
                    <div onClick={handleClick} key={index} className={`${tool === '/align-right.svg' && 'block xl:hidden'} size-5 relative smooth hover:scale-110 active:scale-125 cursor-pointer`}>
                        <Image src={tool} data-src={tool} className={`rotate-180 ${theme === 'dark' && 'invert'}`} alt="toolbar-icon" fill />
                    </div>
                )
            })}

        </div>
    )
}

export default ToolBar