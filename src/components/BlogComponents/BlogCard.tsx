'use client'
import { MD_DATA } from "@/types/interfaces"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";

const BlogCard = (props: { data: MD_DATA }) => {
    const [more, setMore] = useState(170)
    const { data } = props;
    return (
        <div className="bg-white dark:bg-[#292a2b] smooth cursor-pointer hover:scale-105 h-fit min-h-[26rem] max-w-[384px] text-start rounded-xl p-4 shadow-[0_0_7px_6px_#02020208]">
            <Link href={`/resource/blog/${data.slug}`}>
                <div className="h-52 w-full relative" >
                    <Image className="object-cover rounded-md" src={`/${data.image ||'upcoming.png'}`} alt="blogpost-image" fill />
                </div>
            </Link>

            <div className="flex flex-col h-1/2">
                <div className="flex justify-between py-2 text-sm">
                    <span className="opacity-70">{data.date}</span>
                    <div className="flex gap-2 items-center">
                        <Image className="rounded-full" src={'/danielcodeforge.png'} alt="logo" width={20} height={20} />
                        <span className="opacity-70">{data.author}</span>
                    </div>
                </div>

                <div className="text-2xl font-semibold">{data.title}</div>
                <p className="py-2 text-sm">{data.desc.slice(0, more)}...<span onClick={() => setMore(more === 170 ? 999 : 170)} className="hover:font-semibold">{more == 170 ? 'more' : ' less'}</span></p>
            </div>
        </div>
    )
}

export default BlogCard