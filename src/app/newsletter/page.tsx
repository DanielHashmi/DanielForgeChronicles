'use client'
import { checkSubscribeNews, subscribeNews } from "@/actions/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Newsletter = () => {
    const { data: session } = useSession();
    const [is_user_subscribed_news, set_is_user_subscribed_news] = useState(false);

    const subscribe_news = async () => {
        if (session) {
            const subscribed = await subscribeNews(session?.user.email);
            if (subscribed) {
                set_is_user_subscribed_news(subscribed);
            }
        }
    }

    useEffect(() => {
        if (session) {
            const check_subscribe_news = async () => {
                const subscribed = await checkSubscribeNews(session?.user.email);
                set_is_user_subscribed_news(subscribed);
            };
            check_subscribe_news();
        }
    }, [session])

    return (
        <div className="pt-[200px] text-center xl:w-[90vw] flex flex-col justify-self-center border gap-6 bg-[#f8f8f8] dark:bg-background">
            <div className="flex p-6 gap-6 flex-col items-center">
                <div className="text-4xl">Get Ahead</div>

                {/* News Send Card */}
                <div className="bg-white dark:bg-[#292a2b] flex flex-col gap-4 smooth 5 h-fit max-w-[35rem] text-start rounded-xl p-4 shadow-[0_0_7px_6px_#02020208]">
                    <div className="flex flex-col gap-4">
                        <div className="text-xl font-semibold">Subscribe to the Newsletter 📰</div>

                        <p>Get latest updates, By subscribing you will be emailed when new content is available on DanielForgeChronicles, Don't Miss Them!</p>

                        <div className="flex gap-6 flex-col sm:flex-row items-start sm:items-center">
                            <div className="bg-[#f8f8f8] dark:bg-background shadow outline-none w-full rounded-full px-4 py-2 flex justify-between">
                                {session ? session.user.email : 'Authorize to Attach Email'}
                                <Image src="/clip.svg" alt="clip-icon" width={100} height={100} className="size-5 opacity-30 dark:invert" />
                            </div>

                            <div className={`${!session && 'hover-container'}`}>
                                <button
                                    onClick={subscribe_news}
                                    className={`${!session && 'opacity-50'} ${!is_user_subscribed_news && session && 'hover:scale-105 cursor-pointer'} cursor-default rounded-full text-nowrap smooth px-6 p-2 bg-background dark:bg-[#292a2b] w-fit shadow-[0_0_7px_6px_#02020208]`}>
                                    {is_user_subscribed_news ? 'Subscribed 📩' : 'Subscribe 📨'}
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

export default Newsletter