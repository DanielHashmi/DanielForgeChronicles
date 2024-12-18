'use client'
import { get_blogs, get_blogs_count } from "@/actions/actions"
import BlogCards from "@/components/BlogComponents/BlogCards"
import LoadMoreButton from "@/components/OverallComponents/LoadMoreButton"
import { MD_DATA } from "@/types/interfaces"
import { useEffect, useState } from "react"

let limit = 6;

const ClientBlog = ({ blog_data_objects_array }: { blog_data_objects_array: { data: MD_DATA }[] }) => {
    const [initialBlogData, setInitialBlogData] = useState(blog_data_objects_array);
    const [search, setSearch] = useState('');
    const [blogs_for_searching, set_blogs_for_searching] = useState(blog_data_objects_array);

    const loadMoreFunc = async () => {
        const new_blog_data_objects_array = await get_blogs(limit + 3) as unknown as { data: MD_DATA }[];
        setInitialBlogData(new_blog_data_objects_array);
        limit += 3
    }

    useEffect(() => {
        const searchedBlogs = blogs_for_searching.filter((blog) => {
            return (blog.data.title).toLowerCase().includes(search.toLowerCase())
        })
        setInitialBlogData(search === '' ? blogs_for_searching.slice(0, limit) : searchedBlogs)
    }, [search, blog_data_objects_array, blogs_for_searching])


    const startSearch = async () => {
        const all_blogs_count = await get_blogs_count();
        const all_blogs = await get_blogs(all_blogs_count) as unknown as { data: MD_DATA }[];
        set_blogs_for_searching(all_blogs)
    }

    return (
        <main className="text-center w-full md:w-[90vw] flex flex-col justify-self-center border gap-6 bg-[#f8f8f8] dark:bg-background">
            <div className="flex p-6 gap-6 flex-col items-center">

                <div className="w-full flex md:justify-center justify-between gap-6 items-center flex-col md:flex-row relative">
                    <h1 className="text-4xl">BlogPosts</h1>
                    <input onClick={startSearch} onChange={(e) => setSearch(e.target.value)} className="bg-background w-full md:w-fit dark:bg-[#292a2b] rounded-lg md:absolute right-0 md:py-2 py-3 px-4 outline-[#e6e6e6]" placeholder="Search Blogpost" type="text" />
                </div>

                <BlogCards blog_data_objects_array={initialBlogData} />
                <LoadMoreButton data={initialBlogData} loadMoreFunc={loadMoreFunc} limit={limit} />

            </div>
        </main >
    )
}

export default ClientBlog