'use client'
import Image from "next/image"
import Button from "./Button"
import Link from "next/link"
import { BOOK_DATA } from "@/types/interfaces"
import { useState } from "react"
import { sendStar } from "@/actions/get-data"

const BookCard = (props: { data: BOOK_DATA }) => {
    const [show, setShow] = useState(false)
    const data = props.data
    const send_star = async () => {
        await sendStar(props.data.slug, 1)
    }
    return (
        <div className="bg-white dark:bg-[#292a2b] flex flex-col gap-4 smooth cursor-pointer sm:hover:scale-105 h-fit max-w-[35rem] text-start rounded-xl p-4 shadow-[0_0_7px_6px_#02020208]">
            <div className="flex items-start gap-6 flex-col sm:flex-row">
                <Link href={`/`}>
                    <div className="size-52 relative" >
                        <Image className="object-cover rounded-md" src={data.image} alt="image" fill />
                    </div>
                </Link>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 py-2 text-sm">
                        <div className="text-3xl font-semibold">{data.title}</div>
                        <div className="flex gap-2 items-center">
                            <span className="flex gap-2">
                                <Image className="rounded-full" src={'/danielcodeforge.png'} alt="logo" width={20} height={20} />
                                <span className="font-bold">Author: </span>{data.author}</span>
                        </div>

                        <div>
                            <span className="flex gap-2 items-center">
                                <span className="text-xl">✉</span>
                                <span className="font-bold flex">
                                    <span>
                                        <span>Published: </span>{data.date}
                                    </span>
                                    <img onClick={send_star} src="/star.svg" alt="star-icon" className="w-5 ml-24 hover:scale-105 dark:invert" />
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Button text='Preview' />
                        <Button text='Download' />
                        <div className={`smooth ${show && 'font-bold'} text-xs`} onClick={() => setShow(!show)}>More</div>
                    </div>
                </div>
            </div>

            <div className={`${show ? 'flex' : 'hidden'} flex-col overflow-hidden`}>
                <p dangerouslySetInnerHTML={{ __html: data.content }} className="py-2 text-sm prose prose-h2:m-0 prose-h2:mb-4 dark:prose-invert"></p>
            </div>
        </div >
    )
}

export default BookCard