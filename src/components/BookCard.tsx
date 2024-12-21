'use client'
import Image from "next/image"
import Button from "./Button"
import Link from "next/link"
import { BOOK_DATA } from "@/types/interfaces"
import { useEffect, useState } from "react"
import { checkStar, getStarCount, saveOrDeleteStar } from "@/actions/actions"
import { useSession } from "next-auth/react"

const BookCard = (props: { data: BOOK_DATA }) => {
    const [show, setShow] = useState(false);
    const { data: session } = useSession();
    const [alreadyStared, setAlreadyStared] = useState(false);
    const [starCount, setStarCount] = useState(0);
    const data = props.data

    const save_star_delete_star = async () => {
        setAlreadyStared(!alreadyStared);
        await saveOrDeleteStar(session.user.email, props.data.slug)
    }

    useEffect(() => {
        const check_star = async () => {
            const star_exists = await checkStar(session.user.email, props.data.slug);
            setAlreadyStared(star_exists);
        };
        check_star();
    }, [session.user.email, props.data.slug])

    useEffect(() => {
        const get_star_count = async () => {
            const star_count = await getStarCount(session.user.email, props.data.slug);
            setStarCount(star_count);
        };
        get_star_count();
    }, [session.user.email, props.data.slug, alreadyStared])

    return (
        <div className="bg-white dark:bg-[#292a2b] flex flex-col gap-4 smooth sm_scale h-fit max-w-[35rem] text-start rounded-xl p-4 shadow-[0_0_7px_6px_#02020208]">
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
                                <span className="font-bold flex items-center w-full justify-between">
                                    <span>
                                        <span>Published: </span>{data.date}
                                    </span>


                                    {
                                        <div className="text-lg" onClick={save_star_delete_star}>
                                            {alreadyStared ? <span className='bg-[#f8f8f8] cursor-pointer dark:bg-background h-9 shadow w-12 items-center justify-center flex gap-1 rounded '>⭐{starCount}</span>
                                                : <span className="bg-[#f8f8f8] cursor-pointer h-9 dark:bg-background shadow rounded w-12 flex gap-1 items-center justify-center"><Image width={100} height={100} src="/star.svg" alt="star-icon" className='w-5 hover:scale-105 dark:invert' />{starCount}</span>}
                                        </div>
                                    }
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Button text='Preview' />
                        <Button text='Download' />
                        <div className={`smooth cursor-pointer ${show && 'font-bold'} text-xs`} onClick={() => setShow(!show)}>More</div>
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