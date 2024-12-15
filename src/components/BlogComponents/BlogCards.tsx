import BlogCard from "@/components/BlogComponents/BlogCard"
import { MD_DATA } from "@/types/interfaces"

const BlogCards = ({ blog_data_objects_array }: { blog_data_objects_array: { data: MD_DATA }[] }) => {
    return <div className="flex gap-6 justify-center flex-wrap">
        {blog_data_objects_array.map((obj: { data: MD_DATA }, index: number) => (
            <div key={index}>
                <BlogCard data={obj.data} />
            </div>
        ))}
    </div>
}

export default BlogCards