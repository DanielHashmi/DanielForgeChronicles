import Link from "next/link"
import BlogCard from "../BlogComponents/BlogCard"
import { BLOGPOST } from "@/types/interfaces";
import { get_blogs } from "@/actions/actions";
import Button from "../OverallComponents/Button";

const Main = async () => {
    const blog_data_objects_array = await get_blogs(3);
    return (
        <div className="pt-[70px] text-center items-center flex flex-col gap-6 ">
            <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl md:text-7xl font-bold">Welcome to</span>
                <span className="text-4xl sm:text-5xl md:text-7xl font-bold opacity-50 underline">DanielForgeChronicles</span>
            </div>
            <span className="text-xs md:text-base text-nowrap">DanielCodeForge <span className="font-bold md:text-xl text-blue-500">+=</span> DanielForgeChronicles</span>
            <p className="md:text-2xl px-20 md:px-40">
                A Blog and Learning Resource Platform! Here, you&apos;ll discover concise, to-the-point books, instant updates of latest content, human written blog posts, exclusive offers, and much more.
            </p>

            <div className="flex p-6 gap-6 flex-col items-center xl:w-[90vw] bg-[#f8f8f8] dark:bg-background">
                <div className="text-xl">Latest Content</div>
                <div className="flex gap-6 justify-center flex-wrap">
                    {blog_data_objects_array.map((obj: BLOGPOST, index: number) => (
                        <div key={index}>
                            <BlogCard data={obj} />
                        </div>
                    ))}
                </div>
                <Link href={'/resource/blog'}>
                    <Button text="Show More" />
                </Link>
            </div>
        </div>
    )
}

export default Main