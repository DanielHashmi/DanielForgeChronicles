import Image from "next/image"
import Link from "next/link"

const Logo_Part = () => {
    return (
        <div className={`flex items-center gap-3`}>
            <Link href={'/'}>
                <Image className="rounded-full" src={'/DanielForgeChronicles.png'} alt="logo" width={50} height={50} />
            </Link>
            <div className="">
                <div className={`font-bold sm:text-xl`}>
                    DanielForgeChronicles™
                </div>
                <div className="sm:text-sm text-xs font-bold text-gray-400">DanielCodeForge Product</div>
            </div>
        </div>
    )
}

export default Logo_Part