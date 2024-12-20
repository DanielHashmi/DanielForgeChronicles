// 'use client' // Not Important! because this is already being used inside a client component so it is already running on client side
import Image from "next/image"
import Button from "../OverallComponents/Button"
import { BOOK_DATA } from "@/types/interfaces"
import { useEffect, useState } from "react"
import { getClaimedUsers, getStaredUsers, saveOrDeleteStar, sendEmail } from "@/actions/actions"
import { useSession } from "next-auth/react"
import { EmailHtmlTemplate } from "@/helpers/files/variables"

const BookCard = (props: { data: BOOK_DATA }) => {
    const data = props.data
    const { data: session } = useSession();
    const [show, setShow] = useState(false);
    // For Stars
    const [alreadyStared, setAlreadyStared] = useState(false);
    const [starCount, setStarCount] = useState(0);
    // For Email & Claiming Book
    const [claimed, setClaimed] = useState(true);
    const [sendingEmail, setSendingEmail] = useState(false);

    const save_star_delete_star = async () => {
        setAlreadyStared(!alreadyStared);
        await saveOrDeleteStar(session?.user.email, data.slug)
    }

    const claim_book = async () => {
        if (!claimed) {
            const fileUrl = 'https://drive.google.com/uc?export=download&id=1eS7jr5LKf15YW_w7obUtBEWSiQLzSqH_'; // this is insecure here! and this is static for only one book, but i don't want that i want it to be dynamic for each book because this bookcard is not only for one book
            const filename = 'Dunla Math Handbook First Edition (2024) Authored by Daniel Hashmi (DanielCodeForge).pdf'

            setSendingEmail(true);
            const response = await sendEmail(
                session?.user.email,
                'Congratulations🥳 You Have Claimed the Premium Book📙 for Free🎁',
                EmailHtmlTemplate,
                'book_claim', // this is the type of sending email
                data.slug,
                { filename, path: fileUrl },
            )
            if (response) setClaimed(true);
            setSendingEmail(false);
        }
    }

    // check stars initially and so on
    useEffect(() => {
        const get_stared_users = async () => {
            const stared_users: string[] = await getStaredUsers(props.data.slug);
            setAlreadyStared(stared_users.includes(session?.user.email));
            setStarCount(stared_users.length);
        };
        get_stared_users();
    }, [session?.user.email, props.data.slug, alreadyStared])

    // check claims initially and so on
    useEffect(() => {
        const is_user_claimed = async () => {
            const claimed_users: string[] = await getClaimedUsers(props.data.slug);
            if (session?.user.email) setClaimed(claimed_users.includes(session?.user.email));
            // setClaimedUsersCount(claimed_users.length); // if i like to demo the claimed user then maybe i will inshalla // work here
        };
        is_user_claimed();
    }, [session?.user.email, props.data.slug])

    return (
        <div className="bg-white dark:bg-[#292a2b] flex flex-col gap-4 smooth sm_scale text-start rounded-xl p-4 shadow-[0_0_7px_6px_#02020208]">
            <div className="flex items-center sm:items-start gap-6 flex-col sm:flex-row">

                <a href={'https://hashmiverse56.gumroad.com/l/vhymr'}>
                    <div className="size-52 relative" >
                        <Image className="object-cover rounded-md" src={data.image} alt="image" fill />
                    </div>
                </a>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-4 py-2 text-sm">
                        <div className="text-3xl font-semibold">{data.title}</div>
                        <div className="flex gap-2 items-center">
                            <span className="flex gap-2">
                                <Image className="rounded-full" src={'/Daniel Hashmi.jpg'} alt="logo" width={20} height={20} />
                                <span className="font-bold">Author: </span>{data.author}</span>
                        </div>

                        <div>
                            <span className="flex gap-2 items-center">
                                <span className="text-xl">✉</span>
                                <span className="font-bold flex items-center w-full justify-between">
                                    <span>
                                        <span>Published: </span>{data.date}
                                    </span>


                                    {<div className="text-lg" onClick={save_star_delete_star}>
                                        {alreadyStared ? <span className='bg-[#f8f8f8] cursor-pointer dark:bg-background h-9 shadow w-12 items-center justify-center flex gap-1 rounded '>⭐{starCount}</span>
                                            : <span className="bg-[#f8f8f8] cursor-pointer h-9 dark:bg-background shadow rounded w-12 flex gap-1 items-center justify-center"><Image width={100} height={100} src="/star.svg" alt="star-icon" className='w-5 hover:scale-105 dark:invert' />{starCount}</span>}
                                    </div>}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center w-full sm:justify-between relative">
                        <a href={'https://hashmiverse56.gumroad.com/l/vhymr'}>
                            <Button text='Buy It 💗' />
                        </a>
                        <div onClick={claim_book} className={`${claimed && 'opacity-50'}`}>
                            <Button text={sendingEmail ? 'Claiming...' : claimed ? 'Claimed' : 'Claim It'} />
                        </div>
                        <div className={`smooth cursor-pointer absolute sm:relative right-0 ${show && 'font-bold'} text-xs`} onClick={() => setShow(!show)}>More</div>
                    </div>
                </div>
            </div>

            <div className={`${show ? 'max-h-[50rem]' : 'max-h-0 w-fit'} jarking_animation flex-col overflow-hidden`}>
                <p dangerouslySetInnerHTML={{ __html: data.content }} className="py-2 text-sm prose prose-h2:m-0 prose-h2:mb-4 dark:prose-invert"></p>
            </div>
        </div >
    )
}

export default BookCard