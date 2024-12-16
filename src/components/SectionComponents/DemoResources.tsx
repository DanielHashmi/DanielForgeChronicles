import { get_blogs_count, get_books_count } from "@/actions/actions"

const DemoResources = async () => {
    const blogsCount = await get_blogs_count()
    const booksCount = await get_books_count()

    return (
        <div className="flex flex-col lg:pt-24 pb-32 lg:pb-48 pt-8 items-center sm:gap-20 gap-10">
            <div className="flex flex-col sm:flex-row sm:gap-5 text-center">
                <span className="text-4xl sm:text-3xl md:text-5xl font-bold">Current Available</span>
                <span className="text-4xl sm:text-3xl md:text-5xl font-bold opacity-50 underline">Resources</span>
            </div>

            <div className="flex rotate-[354deg] relative md:text-5xl text-nowrap w-screen sm:text-3xl text-2xl items-center gap-20 bg-[#f8f8f8] dark:bg-[#292a2b] text-[#b6b6b6] justify-center p-20 shadow-lg">
                <div className="animate-pulse">({blogsCount}) Blogs 🧾</div>
                <div className="animate-pulse">({booksCount}) Books 📖</div>
                <div className="text-xs absolute bottom-3 right-3">Productions of DanielCodeForge</div>
            </div>
        </div>
    )
}

export default DemoResources