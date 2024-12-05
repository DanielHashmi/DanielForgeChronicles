import { get_blogs_count, get_books_count } from "@/actions/actions"

const DemoResources = async () => {
    const blogsCount = await get_blogs_count()
    const booksCount = await get_books_count()

    return (
        <div className="flex flex-col sm:py-20 py-8 items-center sm:gap-20 gap-10">
            <div className="flex flex-col sm:flex-row sm:gap-5 text-center">
                <span className="text-4xl sm:text-3xl md:text-5xl font-bold">Current Available</span>
                <span className="text-4xl sm:text-3xl md:text-5xl font-bold opacity-50 underline">Resources</span>
            </div>

            <div className="flex rotate-[354deg] sm:text-5xl text-2xl gap-20 bg-[#f8f8f8] dark:bg-background text-[#b6b6b6] w-full justify-center p-20 shadow-lg">
                <div className="animate-pulse">({blogsCount}) Blogs</div>
                <div className="animate-pulse">({booksCount}) Books</div>
                <div className="self-end mr-10 font-bold">{'<-- Free & Exclusive'}</div>
            </div>
        </div>
    )
}

export default DemoResources