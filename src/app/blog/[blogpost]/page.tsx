import Link from "next/link"
import Image from "next/image"
import ToolBar from "@/components/Navber/ToolBar"
import PatrickHand_Regular from "@/app/fonts/Font_Objects/PatrickHand_Regular"
import { notFound } from "next/navigation"

// imports for typography and prettifying the blog content
import fs from 'fs'
import { unified } from 'unified'
import matter from 'gray-matter'
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
import Navigation from "../../../components/Navigation"

const BlogPost = async ({ params }: { params: Promise<{ blogpost: string }> }) => {
    const file_path = `src/blogs/${(await params).blogpost}.md`
    if (!fs.existsSync(file_path)) {
        notFound()
        return;
    }
    const raw_data = fs.readFileSync(file_path, 'utf-8')
    const { data, content } = matter(raw_data);

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
        <div className={`flex justify-center pt-[130px]`} >
            <div className="w-[90vw] flex justify-between sm:p-6 p-2">
                <div className="w-full xl:w-[70vw] flex flex-col gap-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <Link href={'/'}>
                                <Image className="rounded-full" src={'/danielcodeforge.png'} alt="logo" width={30} height={30} />
                            </Link>
                            <div className="flex gap-3 items-center">
                                <div className="font-semibold text-sm">
                                    {data.author}
                                </div>
                                <div className="text-xs">{data.date}</div>
                            </div>
                        </div>
                    </div>

                    <h1 className={`${ComicNeue_Regular.className} md:text-5xl sm:text-4xl text-3xl font-bold`}>{data.title}</h1>

                    <div className={`relative mr-8 sm:mr-0 xl:w-[60vw] md:h-[70vh] h-[30vh] sm:h-[40vh] rounded-xl transition-all duration-1000 cursor-pointer`}>
                        <Image className="object-cover" src={`/${data.image}`} alt="logo" fill />
                    </div>

                    <p dangerouslySetInnerHTML={{ __html: html_file_content }} className={`${PatrickHand_Regular.className}
                         prose-h1:text-3xl prose-h1:md:text-4xl dark:prose-invert prose md:prose-pre:w-[86vw] xl:prose-pre:w-[60vw] prose-p:w-[80vw] xl:prose-p:w-[57vw] tracking-wide text-xl mt-6 pl-2`}></p>
                </div>
                <Navigation html_file_content={html_file_content} />
                <ToolBar />
            </div>
        </div >
    )
}

export default BlogPost