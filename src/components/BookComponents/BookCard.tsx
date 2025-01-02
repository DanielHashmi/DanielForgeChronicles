// 'use client' // Not Important! because this is already being used inside a client component so it is already running on client side
import Image from "next/image"
import Button from "../OverallComponents/Button"
import { BOOK } from "@/types/interfaces"
import { useEffect, useState } from "react"
import { getClaimedUsers, getStaredUsers, saveClaimedUser, saveOrDeleteStar, sendEmail } from "@/actions/actions"
import { useSession } from "next-auth/react"
import { generateEmail } from "@/lib/functions"
import PortableText from "react-portable-text"
import imgBuilder from "@/sanity/utils/imgBuilder"

const BookCard = ({ data }: { data: BOOK }) => {
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
        if (!claimed && !sendingEmail) {
            setSendingEmail(true);
            const response = await sendEmail(
                session?.user.email,
                'Congratulations 🥳 You Have Claimed the Premium Book 📙 for Free 🎁',
                generateEmail(session?.user.name, 'book_claim'),
                'book_claim', // this is the type of sending email
                data.slug,
                { filename: data.file.originalFilename, path: data.file.url },
            )
            if (response) {
                setClaimed(true);
                await saveClaimedUser(session?.user.email, data.slug);
            }
            setSendingEmail(false);
        }
    }

    // check stars initially and so on
    useEffect(() => {
        const get_stared_users = async () => {
            const stared_users: string[] = await getStaredUsers(data.slug);
            setAlreadyStared(stared_users.includes(session?.user.email));
            setStarCount(stared_users.length);
        };
        get_stared_users();
    }, [session?.user.email, data.slug, alreadyStared])

    // check claims initially and so on
    useEffect(() => {
        const is_user_claimed = async () => {
            const claimed_users: string[] = await getClaimedUsers(data.slug);
            if (session?.user.email) setClaimed(claimed_users.includes(session?.user.email));
            // setClaimedUsersCount(claimed_users.length); // if i like to demo the claimed user then maybe i will inshallah // work here
        };
        is_user_claimed();
    }, [session?.user.email, data.slug])

    return (
        <div className="bg-white dark:bg-[#292a2b] flex flex-col gap-4 smooth sm_scale text-start rounded-xl p-4 shadow-[0_0_7px_6px_#02020208]">
            <div className="flex items-center sm:items-start gap-6 flex-col sm:flex-row">

                <a href={'https://hashmiverse56.gumroad.com/l/vhymr'}>
                    <div className="size-52 relative" >
                        <Image className="object-cover rounded-md" src={imgBuilder(data.image).width(720).url() || 'upcoming.png'} alt="image" fill />
                    </div>
                </a>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-4 py-2 text-sm">
                        <div className="text-3xl font-semibold">{data.title}</div>
                        <div className="flex gap-2 items-center">
                            <span className="flex gap-2">
                                <Image className="rounded-full" src={'/Daniel Hashmi.jpg'} alt="logo" width={20} height={20} />
                                <span className="font-bold">Author: </span>{data.author.name}</span>
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

            <div className={`${show ? 'max-h-[200rem]' : 'max-h-0 w-fit'} jarking_animation text-sm prose dark:prose-invert flex-col overflow-hidden`}>
                <PortableText content={data.detail} />
            </div>
        </div >
    )
}

export default BookCard