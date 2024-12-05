'use client'
import BlogCard from "@/components/BlogCard"
import { MD_DATA } from "@/types/interfaces"
import { get_blogs } from "@/actions/actions"
import { useEffect, useState } from "react"
import Button from "@/components/Button"

const Blog = () => {
    const [load, setLoad] = useState(6)
    const [blog_data_objects_array, setBlog_data_objects_array] = useState<{ data: MD_DATA, content: string }[]>([])

    useEffect(() => {
        const temp = async () => {
            const data: { data: MD_DATA, content: string }[] = (await get_blogs()).slice(0, load)
            setBlog_data_objects_array(data)
        }
        temp()
    }, [load])

    return (
        <div className="pt-[200px] text-center xl:w-[90vw] flex flex-col justify-self-center border gap-6 bg-[#f8f8f8] dark:bg-background">
            <div className="flex p-6 gap-6 flex-col items-center">
                <div className="text-4xl">BlogPosts</div>
                <div className="flex gap-6 justify-center flex-wrap">

                    {blog_data_objects_array.length === 0 ? [1, 2, 3].map((key) => (
                        <div key={key} className="bg-white dark:bg-[#292a2b] animate-pulse min-h-[26rem] w-[384px] rounded-xl shadow-[0_0_7px_6px_#02020208]"></div>
                    )) : blog_data_objects_array.map((obj: { data: MD_DATA; content: string }, index: number) => (
                        <div key={index}>
                            <BlogCard data={obj.data} />
                        </div>
                    ))}
                </div>

                {load > blog_data_objects_array.length + 3 && blog_data_objects_array.length != 0 ? "That's It! 🤷‍♂️" : <div onClick={() => setLoad(load + 3)} >
                    <Button text='Load More' />
                </div>}


            </div>
        </div >
    )
}

export default Blog