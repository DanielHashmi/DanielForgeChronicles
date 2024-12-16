'use client'
import Link from "next/link"
import Logo_Part from "./Navber/Logo_Part"
import Image from "next/image"
import Button from "./OverallComponents/Button"
import { handle_send } from "@/actions/actions"
import { useState } from "react"

const Footer = () => {
    const [sent, setSent] = useState(false);

    return (
        <div className="flex justify-center">
            <div className="bg-[#f8f8f8] dark:bg-background p-6 mt-6 gap-6 flex flex-col sm:w-[90vw]">
                <div className="flex gap-6 flex-wrap">
                    <div className="flex flex-col gap-6 flex-wrap">
                        <div className="dark:bg-[#292a2b] bg-background min-w-[19rem] rounded-lg text-sm flex gap-6 p-6 flex-col">
                            <Logo_Part />
                            <div className="flex gap-2 justify-between items-center">
                                <a href="https://github.com/DanielHashmi" className="bg-[#f8f8f8] dark:opacity-50 dark:hover:opacity-100 dark:bg-background rounded-[10rem] p-5 hover:shadow" >
                                    <Image className="dark:invert" src={'/x.com.svg'} alt="logo" width={30} height={30} />
                                </a>
                                <a href="https://x.com/_DanielHashmi_" className="bg-[#f8f8f8] dark:opacity-50 dark:hover:opacity-100 dark:bg-background rounded-[10rem] p-5 hover:shadow" >
                                    <Image className="dark:invert" src={'/github.svg'} alt="logo" width={30} height={30} />
                                </a>
                                <div className="text-lg">Social&apos;s</div>
                            </div>
                        </div>

                        <div className="dark:bg-[#292a2b] bg-background w-fit flex flex-col gap-2 rounded-lg text-sm p-6">
                            <div className="font-bold">Quick Links</div>
                            <div className="flex gap-6">
                                <div className="flex flex-col gap-1">
                                    <Link className="hover:font-bold" href={'/'}>Home</Link>
                                    <Link className="hover:font-bold" href={'/newsletter'}>Newsletter</Link>
                                    <Link className="hover:font-bold" href={'/download'}>Download</Link>
                                    <Link className="hover:font-bold" href={'/membership'}>Membership</Link>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <a className="hover:font-bold" href={'https://danielcodeforge.vercel.app'}>Company</a>
                                    <a className="hover:font-bold" href={'/DanielForgeChroniclesPrivacyPolicy.pdf'}>Privacy Policy</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form action={async (e) => { const res = !sent ? await handle_send(e) : true; setSent(res) }} className={`dark:bg-[#292a2b] bg-background w-fit flex flex-col items-center h-fit gap-3 rounded-lg text-sm p-6`}>
                        <div className="font-bold">Give a Feedback, Idea, or Say Hi!</div>
                        <div className="bg-[#f8f8f8] dark:bg-background rounded-full w-full">
                            <input disabled={sent} name="email" className="bg-transparent py-2 px-4 outline-none" placeholder="Email" type="email" minLength={13} required/>
                        </div>

                        <div className="bg-[#f8f8f8] dark:bg-background rounded-full w-full">
                            <input disabled={sent} name="message" className="bg-transparent py-2 px-4 outline-none" placeholder="Message" type="text" required/>
                        </div>
                        <div className={`${sent && 'opacity-50'}`}>
                            <Button text={sent ? 'Received 💛' : 'Send'} />
                        </div>
                    </form>

                    <div className="flex gap-6 flex-col">
                        <div className="dark:bg-[#292a2b] bg-background max-w-[19rem] rounded-lg text-sm flex gap-2 p-6 flex-col">
                            <div className="font-bold">Purpose & Terms of Use</div>
                            <p>
                                Here you can learn and get benefit of the blogs, books etc... and don't waste your time searching for the best resource, We already have done it for you so that you only focus on you goals, avoid being distracted from the ocean of unordered knowledge which might waste your time learning and understanding which doesn't matters for you and unnecessary for your purpose.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="bg-white dark:bg-[#292a2b] p-3 rounded-lg text-center text-xs sm:text-sm md:text-base">ALL RIGHTS RESERVED COPYRIGHT &copy; DANIELFORGECHRONICLES  ( DANIELCODEFORGE )</div>
            </div>
        </div>
    )
}

export default Footer