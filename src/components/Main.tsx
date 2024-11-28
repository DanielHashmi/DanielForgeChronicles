import Link from "next/link"
import BlogCard from "./BlogCard"
import matter from "gray-matter";
import { MD_DATA } from "@/types/interfaces";
import fs from 'fs'

const Main = () => {
    const blog_data_objects_array = fs.readdirSync('src/blogs').map((file_name: string) => {
        if (fs.existsSync(`src/blogs/${file_name}`) && file_name.endsWith('.md')) {
            const { data, content } = matter(fs.readFileSync(`src/blogs/${file_name}`))
            return { data, content }
        }
    }).slice(0, 3) as { data: MD_DATA; content: string }[];

    return (
        <div className="pt-[200px] text-center items-center flex flex-col gap-6 ">
            <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl md:text-7xl font-bold">Welcome to</span>
                <span className="text-4xl sm:text-5xl md:text-7xl font-bold opacity-50 underline">DanielForgeChronicles</span>
            </div>
            <span className="text-xs md:text-base">DanielCodeForge <span className="font-bold md:text-xl text-blue-500">+=</span> DanielForgeChronicles</span>
            <p className="md:text-2xl px-20 md:px-40">A Blog and Learning Resource Platform where you can get benefits and read the most concise and to the point Articles, News, Blogposts, Tutorials and much more, Learn from a person like you!</p>

            <div className="flex p-6 gap-6 flex-col items-center xl:w-[90vw] bg-[#f8f8f8] dark:bg-background">
                <div className="text-xl">Latest Content</div>
                <div className="flex gap-6 justify-center flex-wrap">
                    {blog_data_objects_array.map((obj: { data: MD_DATA; content: string }, index: number) => (
                        <div key={index}>
                            <BlogCard data={obj.data} content={obj.content} />
                        </div>
                    ))}
                </div>
                <Link href={'/blog'} className="rounded-full smooth hover:bg-transparent hover:scale-105 px-6 p-2 bg-background w-fit shadow-[0_0_7px_6px_#02020208] dark:shadow-[0_0_2px_0_#ffffff82]">Show More</Link>
            </div>
        </div>
    )
}

export default Main