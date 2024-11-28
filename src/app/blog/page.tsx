import BlogCard from "@/components/BlogCard"
import Link from "next/link"
import { MD_DATA } from "@/types/interfaces"
import fs from 'fs'
import matter from "gray-matter"

const Blog = () => {
    const blog_data_objects_array = fs.readdirSync('src/blogs').map((file_name: string) => {
        if (fs.existsSync(`src/blogs/${file_name}`) && file_name.endsWith('.md')) {
            const { data, content } = matter(fs.readFileSync(`src/blogs/${file_name}`))
            return { data, content }
        }
    }) as { data: MD_DATA; content: string }[];

    return (
        <div className="pt-[200px] text-center xl:w-[90vw] flex flex-col justify-self-center border gap-6 bg-[#f8f8f8] dark:bg-background">
            <div className="flex p-6 gap-6 flex-col items-center">
                <div className="text-4xl">BlogPosts</div>
                <div className="flex gap-6 justify-center flex-wrap">
                    {blog_data_objects_array.map((obj: { data: MD_DATA; content: string }, index: number) => (
                        <div key={index}>
                            <BlogCard data={obj.data} content={obj.content} />
                        </div>
                    ))}
                </div>
                <Link href={'/blog'} className="rounded-full smooth hover:bg-transparent hover:scale-105 px-6 p-2 bg-background w-fit shadow-[0_0_7px_6px_#02020208] dark:shadow-[0_0_2px_0_#ffffff82]">Load More</Link>
            </div>
        </div>
    )
}

export default Blog