import { get_blogs } from "@/actions/actions";
import ClientBlog from "@/components/BlogComponents/ClientBlog";
import { MD_DATA } from "@/types/interfaces";
const Blog = async () => {
    const blog_data_objects_array = await get_blogs(6) as unknown as { data: MD_DATA }[];
    return <ClientBlog blog_data_objects_array={blog_data_objects_array} />
}
export default Blog
