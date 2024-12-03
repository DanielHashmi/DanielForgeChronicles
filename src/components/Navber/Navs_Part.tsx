'use client'
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react";
import { RESOURCE_SM_CARD } from "@/types/interfaces";
import { useSession } from "next-auth/react";
import { checkSubscription } from "@/actions/get-data";
import { useStore } from "@/context/context";

const Navs_Part = () => {
    const { theme, setTheme } = useTheme()
    const [showResource, setShowResource] = useState(false)
    const [sheet_open, setSheet_open] = useState(false);
    const { data: session } = useSession();
    const { user_data, set_user_data } = useStore()

    useEffect(() => {
        const check_subscription = async () => {
            if (session) {
                const res = await checkSubscription(session.user.email);
                set_user_data(res);
            }
        };
        check_subscription();

    }, [session?.user && session.user.email])

    const nav_btns = [
        'Newsletter',
        'Membership',
        'Authenticate',
    ];

    const resources: RESOURCE_SM_CARD[] = [
        // {
        //     name: 'Tutorials',
        //     detail: 'To the Point Tutorials',
        //     locked: false,
        // },
        {
            name: 'Blogs',
            detail: 'Human Written Blogs',
            locked: false,
            quality: "FREE",
        },
        // {
        //     name: 'Courses',
        //     detail: 'Simplified & Advance Courses',
        //     locked: true,
        //     quality: "GOLDEN",
        // },
        // {
        //     name: 'Notes',
        //     detail: '100% Tested Notes ',
        //     locked: false,
        // },
        {
            name: 'Books',
            detail: 'Most Advance Concise SImplified Books',
            locked: user_data?.subscribed ? false : true,
            quality: "PREMIUM",
        },
    ];

    return (
        <div className="flex lg:gap-12 gap-4 xl:text-xl lg:text-md font-bold items-center z-50 relative">

            {/* resource floating div */}
            <div
                onMouseOver={() => setShowResource(true)}
                onMouseOut={() => setShowResource(false)}
                className={`${showResource ? 'h-96 py-4' : 'h-0'} px-4 xl:w-[581px] sm:w-[545px] w-[90vw] right-0 top-[56px] rounded-xl transition-all duration-1000 dark:bg-[#292a2b] bg-[#f8f8f8] absolute shadow-[0px_7px_7px_0px_#00000017] backdrop-blur-md overflow-auto flex flex-wrap gap-4 content-start`}>
                {resources.map((obj, index) => (
                    <Link
                        href={!obj.locked ? `/${obj.name.toLowerCase().slice(0, -1)}` : ''}
                        key={index}
                        className={`${showResource && !obj.locked ? 'opacity-100 cursor-pointer hover:shadow' : showResource && obj.locked ? 'opacity-50 cursor-default' : 'opacity-0'} 
                        transition-opacity duration-1000 bg-background p-4 rounded-md min-h-[84px] xl:w-[165px] sm:w-[160px] w-[150px] text-sm  dark:shadow-gray-600`} >

                        <div>{obj.name} {obj.locked ? <span className="hover-container">🔒<span className="tooltip">Subscribe to Unlock! 🔑</span></span> : ''}</div>
                        <p className="text-xs font-thin opacity-70">{obj.detail}</p>
                    </Link>
                ))}
            </div>

            {/* navbar buttons for screen over lg/1024px size */}
            <div className={`items-center hidden lg:flex gap-12 justify-around`}>

                <button
                    onMouseOver={() => setShowResource(true)}
                    onMouseOut={() => setShowResource(false)}
                    className="hover:underline-offset-4 smooth hover:underline underline-offset-0 flex items-center gap-3"
                >
                    Resource
                    <Image className="dark:invert" src={showResource ? '/angle-up.svg' : '/angle-down.svg'} alt="angle-icon" width={12} height={12} />
                </button>

                {nav_btns.map((btn: string, index: number) => {
                    return (
                        <Link className="hover:underline-offset-4 smooth hover:underline underline-offset-0" key={index} href={`/${btn.toLowerCase()}`}>{btn}</Link>
                    )
                })}
            </div>

            {/* dark/light toggle button */}
            <Image onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`z-50 cursor-pointer ${theme === 'dark' && 'invert'}`} src={theme === 'dark' ? '/sun.svg' : '/moon.svg'} alt="moon/sun-icon" width={20} height={20} />

            {/* navbar buttons for screen under lg/1024px size */}
            <Sheet open={sheet_open} onOpenChange={setSheet_open}>
                <SheetTrigger className={`cursor-pointer block z-[100] lg:hidden ${theme === 'dark' && 'invert'}`} >
                    <Image src={'/menu.svg'} alt="menu-icon" width={40} height={40} />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader className="flex flex-col justify-around h-full items-center text-xl">
                        <SheetTitle className="hidden"></SheetTitle>
                        <button
                            onClick={() => { setShowResource(!showResource); setSheet_open(false) }}
                            className="hover:underline-offset-4 smooth hover:underline underline-offset-0 flex items-center gap-3"
                        >
                            Resource
                            <Image className="dark:invert" src={showResource ? '/angle-up.svg' : '/angle-down.svg'} alt="angle-icon" width={12} height={12} />
                        </button>
                        {nav_btns.map((btn: string, index: number) => {
                            return (
                                <Link className="hover:underline-offset-4 smooth hover:underline underline-offset-0" key={index} href={`/${btn.toLowerCase()}`}>{btn}</Link>
                            )
                        })}
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div >
    )
}

export default Navs_Part