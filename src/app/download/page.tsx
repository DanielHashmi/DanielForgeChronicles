'use client'
// import { checkSubscription } from "@/actions/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
// import { useEffect, useState } from "react";


// let deferedPrompt;
// window.addEventListener('beforeinstallprompt', (e) => {
//     e.preventDefault()
    // deferedPrompt = e;
// })

const Download = () => {
    const { data: session } = useSession();
    // const [subscribed, setSubscribed] = useState(false);
    // const [PWA, setPWA] = useState(false); // PWA disabled by default

    // useEffect(() => {
    //     const check_subscription = async () => {
    //         const isUserSubscribed = await checkSubscription(session?.user.email);
    //         setSubscribed(isUserSubscribed);
    //     };
    //     check_subscription();
    // }, [])





    // const download_DFC = async () => {
    //     if (session && deferedPrompt) {
    //         deferedPrompt.prompt()
    //         deferedPrompt.userChoice.then((choiceResult) => {
    //             if (choiceResult.outcome === 'accepted') {
    //                 console.log('User Installed');
    //             } else {
    //                 console.log('User Closed');
    //             }
    //         })
    //         deferedPrompt = null;
    //     } else {
    //         console.log('Install Prompt not available');

    //     }
    // }

    return (
        <div className="text-center xl:w-[90vw] flex flex-col justify-self-center border gap-6 bg-[#f8f8f8] dark:bg-background">
            <div className="flex p-6 gap-6 flex-col items-center">
                <div className="text-4xl">Access Offline</div>

                {/* Download Offline Card */}
                <div className="bg-white dark:bg-[#292a2b] flex flex-col gap-4 smooth 5 h-fit max-w-[35rem] text-start rounded-xl p-4 shadow-[0_0_7px_6px_#02020208]">
                    <div className="flex flex-col gap-4">
                        <div className="text-xl font-semibold">Download & Install DFC Locally 💻</div>

                        <p>Want to access the content offline locally, Don&apos;t worry you can download & install DFC (DanielForgeChronicles) in any of your device platform independently.</p>

                        <div className="flex gap-6 flex-col sm:flex-row items-start sm:items-center">
                            <div className="bg-[#f8f8f8] dark:bg-background shadow outline-none w-full rounded-full px-4 py-2 flex justify-between">
                                {session ? session.user.email : 'Authorize to Attach Email'}
                                <Image src="/clip.svg" alt="clip-icon" width={100} height={100} className="size-5 opacity-30 dark:invert" />
                            </div>

                            <div className={`${!session && 'hover-container'}`}>
                                <button
                                    // onClick={download_DFC}
                                    className={`${!session && 'opacity-50'} hover:scale-105 cursor-pointer rounded-full text-nowrap smooth px-6 p-2 bg-background dark:bg-[#292a2b] w-fit shadow-[0_0_7px_6px_#02020208]`}>
                                    {'Download 💾'}
                                </button>
                                <span className="tooltip">Authorize Your Email First!</span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Download