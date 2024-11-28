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

const Navs_Part = () => {
    const nav_btns = [
        'Resource',
        'Newsletter',
        'Exclusive',
        'Membership',
    ];
    const { theme, setTheme } = useTheme()
    return (
        <div className="flex lg:gap-12 gap-4 xl:text-xl lg:text-md font-bold items-center z-50">

            {/* navbar buttons for screen over lg/1024px size */}
            <div className={`items-center hidden lg:flex gap-12 justify-around`}>
                {nav_btns.map((btn: string, index: number) => {
                    return (
                        <Link className="hover:underline-offset-4 smooth hover:underline underline-offset-0" key={index} href={`/${btn.toLowerCase()}`}>{btn}</Link>
                    )
                })}
            </div>

            {/* dark/light toggle button */}
            <Image onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`z-50 cursor-pointer ${theme === 'dark' && 'invert'}`} src={theme === 'dark' ? '/sun.svg' : '/moon.svg'} alt="moon/sun-icon" width={20} height={20} />

            {/* navbar buttons for screen under lg/1024px size */}
            <Sheet>
                <SheetTrigger className={`cursor-pointer block z-[100] lg:hidden ${theme === 'dark' && 'invert'}`} >
                    <Image src={'/menu.svg'} alt="menu-icon" width={40} height={40} />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader className="flex flex-col justify-around h-full items-center text-xl">
                        <SheetTitle className="hidden"></SheetTitle>
                        {nav_btns.map((btn: string, index: number) => {
                            return (
                                <Link className="hover:underline-offset-4 smooth hover:underline underline-offset-0" key={index} href={`/${btn.toLowerCase()}`}>{btn}</Link>
                            )
                        })}
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Navs_Part