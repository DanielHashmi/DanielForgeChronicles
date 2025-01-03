'use client'
import Link from "next/link"
import Logo_Part from "../Navber/Logo_Part"
import Image from "next/image"
import Button from "../OverallComponents/Button"
import { handle_send } from "@/actions/actions"
import { useState } from "react"
import Attribution from "./Attribution"

const Footer = () => {
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false)

    const handleSend = async (e: FormData) => {
        if (!sending) {
            const res = await handle_send(e);
            setSent(res)
            setSending(false);
        }
    }

    return (
        <div className="flex justify-center">
            <div className="bg-[#f8f8f8] dark:bg-background p-6 mt-6 gap-6 flex flex-col w-fit">
                <div className="flex gap-6 flex-wrap justify-center md:justify-start">
                    <div className="flex flex-col gap-6 flex-wrap">
                        <div className="dark:bg-[#292a2b] bg-background w-[305px] rounded-lg text-sm flex gap-6 p-6 flex-col">
                            <Logo_Part />
                            <div className="flex gap-2 justify-between items-center">
                                <a href="https://x.com/_DanielHashmi_" className="bg-[#f8f8f8] dark:opacity-50 dark:hover:opacity-100 dark:bg-background rounded-[10rem] p-5 hover:shadow" >
                                    <Image className="dark:invert" src={'/x.com.svg'} alt="logo" width={30} height={30} />
                                </a>
                                <a href="https://github.com/DanielHashmi" className="bg-[#f8f8f8] dark:opacity-50 dark:hover:opacity-100 dark:bg-background rounded-[10rem] p-5 hover:shadow" >
                                    <Image className="dark:invert" src={'/github.svg'} alt="logo" width={30} height={30} />
                                </a>
                                <div className="text-lg">Social&apos;s</div>
                            </div>
                        </div>

                        <div className="dark:bg-[#292a2b] bg-background flex w-[305px] flex-col gap-2 rounded-lg text-sm p-6">
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
                                    <a className="hover:font-bold" target="_blank" href={'https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1'}>Term of Use</a>
                                    <a className="hover:font-bold" target="_blank" href={'https://docs.google.com/document/d/1CfhpKECKC9TiTpRSuqkovdhr2dHGnfQU2mC8ARP8PTY/edit?usp=drive_link'}>Privacy Policy</a>
                                </div>
                            </div>
                        </div>
                    </div>


                    <form action={handleSend} onSubmit={() => setSending(true)} className={`dark:bg-[#292a2b] bg-background w-[305px] flex flex-col items-center h-fit gap-3 rounded-lg text-sm p-6`}>
                        <div className="font-bold">Give Feedback, Report a Bug, or Say Hi!</div>
                        <div className="bg-[#f8f8f8] dark:bg-background rounded-full w-full">
                            <input disabled={sent} name="email" className="bg-transparent py-2 px-4 outline-none" placeholder="Email" type="email" minLength={13} required />
                        </div>

                        <div className="bg-[#f8f8f8] dark:bg-background rounded-full w-full">
                            <input disabled={sent} name="message" className="bg-transparent py-2 px-4 outline-none" placeholder="Message" type="text" required />
                        </div>
                        <button disabled={sent} className={`${sent && 'opacity-50'}`}>
                            <Button text={sending ? 'Sending...' : sent ? 'Received 💛' : 'Send'} />
                        </button>
                    </form>

                    <div className="dark:bg-[#292a2b] bg-background w-[305px] h-fit flex flex-col gap-2 rounded-lg text-sm p-6">
                        <div className="font-bold">Content</div>
                        <div className="">Blogs <span className="font-bold">{': FREE'}</span> 🎉</div>
                        <div className="">DFC <span className="font-bold">{': FREE DOWNLOAD'}</span> 🎉</div>
                        <div className="">Books <span className="font-bold">{': SUBSCRIPTION REQUIRED'}</span> 🥉</div>

                    </div>

                    <div className="flex gap-6 flex-col">
                        <div className="dark:bg-[#292a2b] bg-background max-w-[19rem] rounded-lg text-sm flex gap-2 p-6 flex-col">
                            <div className="font-bold">Purpose</div>
                            <p>

                                Learn what matters most.
                                We&apos;ve picked the best blogs, books, and resources to save you time and help you stay focused. No need to sort through endless options—we&apos;ve done that for you. Just focus on your goals without any distractions.
                            </p>
                        </div>
                    </div>

                </div>
                <Attribution />
            </div>
        </div>
    )
}

export default Footer
