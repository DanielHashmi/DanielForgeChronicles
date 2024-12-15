import Link from "next/link"
import Logo_Part from "./Navber/Logo_Part"
import Image from "next/image"

const Footer = () => {
    return (
        <div className="bg-[#f8f8f8] dark:bg-background flex justify-center">
            <div className="py-6 mt-6 gap-6 flex flex-col w-[90vw]">
                <div className="flex gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="dark:bg-[#292a2b] bg-background min-w-[19rem] rounded-lg text-sm flex gap-6 p-6 flex-col">
                            <Logo_Part />
                            <div className="flex gap-2 justify-between items-center">
                                <div className="bg-[#f8f8f8] dark:opacity-50 dark:hover:opacity-100 dark:bg-background rounded-[10rem] p-5 hover:shadow cursor-pointer" >
                                    <Image className="dark:invert" src={'/x.com.svg'} alt="logo" width={30} height={30} />
                                </div>
                                <div className="bg-[#f8f8f8] dark:opacity-50 dark:hover:opacity-100 dark:bg-background rounded-[10rem] p-5 hover:shadow cursor-pointer" >
                                    <Image className="dark:invert" src={'/github.svg'} alt="logo" width={30} height={30} />
                                </div>
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

                    <div className="dark:bg-[#292a2b] bg-background w-fit flex flex-col gap-2 rounded-lg text-sm p-6">
                        <div className="font-bold">Purpose & Terms of Use</div>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam obcaecati temporibus excepturi eum, quis suscipit at ducimus fugiat voluptates, vitae laborum fugit vero exercitationem voluptatibus beatae, non modi illum quibusdam.
                        </p>
                    </div>
                    <div className="dark:bg-[#292a2b] bg-background w-fit flex flex-col gap-2 rounded-lg text-sm p-6">
                        <div className="font-bold">Give a Feedback, Idea, or Say Hi!</div>
                        <div className="bg-[#f8f8f8] rounded-full">
                            <input className="bg-transparent px-1" placeholder="Email" type="text" />
                            <input className="bg-transparent px-1" placeholder="Message" type="text" />
                        </div>

                    </div>
                </div>

                <div className="bg-white dark:bg-[#292a2b] p-3 rounded-lg text-center">ALL RIGHTS RESERVED COPYRIGHT &copy; DANIELFORGECHRONICLES  ( DANIELCODEFORGE )</div>
            </div>
        </div>
    )
}

export default Footer