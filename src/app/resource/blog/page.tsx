import { get_blogs } from "@/actions/actions";
import ClientBlog from "@/components/BlogComponents/ClientBlog";
const Blog = async () => {
    const blog_data_objects_array = await get_blogs(6);
    return <ClientBlog blog_data_objects_array={blog_data_objects_array} />
}
export default Blog
