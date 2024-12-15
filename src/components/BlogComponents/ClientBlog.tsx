'use client'
import { get_blogs } from "@/actions/actions"
import BlogCards from "@/components/BlogComponents/BlogCards"
import LoadMoreButton from "@/components/OverallComponents/LoadMoreButton"
import { MD_DATA } from "@/types/interfaces"
import { useState } from "react"

const ClientBlog = ({ blog_data_objects_array }: { blog_data_objects_array: { data: MD_DATA }[] }) => {
    const [limit, setLimit] = useState(6);
    const [initialBlogData, setInitialBlogData] = useState(blog_data_objects_array);

    const loadMoreFunc = async () => {
        const new_blog_data_objects_array = await get_blogs(limit + 3) as unknown as { data: MD_DATA }[];
        setInitialBlogData(new_blog_data_objects_array);
        setLimit(limit + 3);
    }

    return (
        <main className="pt-[200px] text-center xl:w-[90vw] flex flex-col justify-self-center border gap-6 bg-[#f8f8f8] dark:bg-background">
            <div className="flex p-6 gap-6 flex-col items-center">
                <h1 className="text-4xl">BlogPosts</h1>

                <BlogCards blog_data_objects_array={initialBlogData} />

                <LoadMoreButton data={initialBlogData} loadMoreFunc={loadMoreFunc} limit={limit} />

            </div>
        </main >
    )
}

export default ClientBlog