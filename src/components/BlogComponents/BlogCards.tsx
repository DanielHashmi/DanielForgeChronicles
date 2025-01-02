import BlogCard from "@/components/BlogComponents/BlogCard"
import { BLOGPOST } from "@/types/interfaces"

const BlogCards = ({ blog_data_objects_array }: { blog_data_objects_array: BLOGPOST[] }) => {
    console.log(blog_data_objects_array);
    
    return <div className="flex gap-6 justify-center flex-wrap">
        {blog_data_objects_array.map((obj: BLOGPOST, index: number) => (
            <div key={index}>
                <BlogCard data={obj} />
            </div>
        ))}
    </div>
}

export default BlogCards