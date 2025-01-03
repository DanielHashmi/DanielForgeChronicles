import Link from "next/link"
import Image from "next/image"
import ToolBar from "@/components/BlogComponents/ToolBar"
import PatrickHand_Regular from "@/app/fonts/Font_Objects/PatrickHand_Regular"
import { notFound } from "next/navigation"

// imports for typography and prettifying the blog content
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import rehypeDocument from 'rehype-document'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import ComicNeue_Regular from "@/app/fonts/Font_Objects/ComicNeue_Regular"
import Navigation from "@/components/BlogComponents/Navigation"
import { Metadata } from "next"
import { client } from "@/sanity/utils/client"
import { blog_post_query } from "@/sanity/grok/queries"
import { BLOGPOST } from "@/types/interfaces"
import imgBuilder from "@/sanity/utils/imgBuilder"

// Dynamically Generating Params at Build Time for the BlogPosts
export const revalidate = 3600; // Rebuild the page
export async function generateStaticParams() {
    const blogPostSlugs: { slug: string }[] = await client.fetch(`*[_type == 'blogpost']{
        'blogpost':slug.current
      }`);
    return blogPostSlugs;
}

// Dynamically Generate Metadata for Each Blogpost
export async function generateMetadata({ params }: { params: Promise<{ blogpost: string }> }): Promise<Metadata> {
    const blogPostData: BLOGPOST = (await client.fetch(blog_post_query((await params).blogpost)));
    return {
        title: blogPostData.title,
        description: blogPostData.description,
        metadataBase: new URL(process.env.BASE_URL),
        openGraph: {
            images: [
                { url: imgBuilder(blogPostData.image).width(1920).url() }
            ]
        }
    }
}

const BlogPost = async ({ params }: { params: Promise<{ blogpost: string }> }) => {
    const blogPostData: BLOGPOST = (await client.fetch(blog_post_query((await params).blogpost)));
    if (!blogPostData) return notFound();
    const { data, content } = { data: blogPostData, content: blogPostData.content.code };

    // make a function for this
    const html_file_content = (await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .use(rehypeAutolinkHeadings)
        .use(rehypeSlug)
        .use(rehypePrettyCode, {
            theme: 'material-theme',
            transformers: [
                transformerCopyButton({
                    visibility: 'always',
                    feedbackDuration: 3_000,
                }),
            ],
        })
        .process(content)).toString();

    return (
        <div className={`flex justify-center pt-6`} >
            <div className="w-[90vw] flex justify-between sm:p-6 p-2">
                <div className="w-full xl:w-[70vw] flex flex-col gap-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <Link href={'/'}>
                                <Image className="rounded-full" src={imgBuilder(data.author.image).width(100).url() || '/danielcodeforge.png'} alt="logo" width={30} height={30} />
                            </Link>
                            <div className="flex gap-3 items-center">
                                <div className="font-semibold text-sm">
                                    {data.author.name}
                                </div>
                                <div className="text-xs">{data.date}</div>
                            </div>
                        </div>
                    </div>

                    <h1 className={`${ComicNeue_Regular.className} md:text-5xl sm:text-4xl text-3xl font-bold`}>{data.title}</h1>

                    <div className={`relative mr-8 sm:mr-0 xl:w-[60vw] md:h-[70vh] h-[30vh] sm:h-[40vh] rounded-xl transition-all duration-1000 cursor-pointer`}>
                        <Image className="object-cover" src={imgBuilder(data.image).width(1920).url() || 'upcoming.png'} alt="logo" fill />
                    </div>

                    <p dangerouslySetInnerHTML={{ __html: html_file_content }} className={`${PatrickHand_Regular.className}
                         prose-h1:text-3xl text-sm sm:text-base md:text-lg prose-h1:md:text-4xl dark:prose-invert prose md:prose-pre:w-[86vw] xl:prose-pre:w-[60vw] prose-p:w-[80vw] xl:prose-p:w-[57vw] tracking-wide mt-6 pl-2 prose-pre:select-text prose-code:relative`}></p>
                </div>
                <Navigation html_file_content={html_file_content} />
                <ToolBar />
            </div>
        </div >
    )
}

export default BlogPost