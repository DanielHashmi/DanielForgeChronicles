'use client'
import { MD_DATA } from "@/types/interfaces"
import { get_books } from "@/actions/get-data"
import { useEffect, useState } from "react"
import BookCard from "@/components/BookCard"
import { transformerCopyButton } from "@rehype-pretty/transformers"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeDocument from "rehype-document"
import rehypeFormat from "rehype-format"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import Button from "@/components/Button"
import { useStore } from "@/context/context"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const Book = () => {
    const router = useRouter()
    const { user_data } = useStore()
    const [load, setLoad] = useState(6)
    const [book_data_objects_array, setBook_data_objects_array] = useState<{ data: MD_DATA, content: string }[]>([])
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/membership')
        } else if (status === 'authenticated' && user_data?.subscribed == false) {
            router.push('/membership')
        }
    }, [status, user_data?.subscribed])

    useEffect(() => {
        const temp = async () => {
            const data: { data: MD_DATA, content: string }[] = (await get_books()).slice(0, load) // why im calling all data and then slicing it, this looks inefficient!

            data.map(async (obj) => {
                obj.content = (await unified()
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
                                feedbackDuration: 3000,
                            }),
                        ],
                    })
                    .process(obj?.content)).toString();

            })
            setBook_data_objects_array(data)

        }
        temp()
    }, [load])

    return (
        <div className="pt-[200px] text-center xl:w-[90vw] flex flex-col justify-self-center border gap-6 bg-[#f8f8f8] dark:bg-background">
            <div className="flex p-6 gap-6 flex-col items-center">
                <div className="text-4xl">Books</div>

                <div className="flex gap-6 justify-center flex-wrap">

                    {
                        book_data_objects_array.length === 0 || !user_data?.subscribed ? [1, 2, 3].map((key) => (
                            <div key={key} className="bg-white dark:bg-[#292a2b] animate-pulse min-h-[240px] w-[384px] rounded-xl shadow-[0_0_7px_6px_#02020208]"></div>
                        )) : user_data?.subscribed && book_data_objects_array.map((obj: { data: MD_DATA; content: string }, index: number) => (
                            <div key={index}>
                                <BookCard data={{ ...obj.data, content: obj.content }} />
                            </div>
                        ))
                    }


                </div>

            </div>

            {
                user_data?.subscribed && <div className="mb-6">
                    {
                        load > book_data_objects_array.length + 3 && book_data_objects_array.length != 0 ? "That's It! 🤷‍♂️" : <div onClick={() => setLoad(load + 3)} >
                            <Button text='Load More' />
                        </div>
                    }
                </div>
            }


        </div>
    )
}

export default Book