import { MD_DATA } from "@/types/interfaces"
import Image from "next/image"
import Link from "next/link";

const BlogCard = (props: { data: MD_DATA, content: string }) => {
    const { data, content } = props;
    return (
        <Link href={`/blog/${data.slug}`}>

            <div className="bg-white dark:bg-background smooth cursor-pointer hover:scale-105 h-fit min-h-[26rem] max-w-[384px] text-start rounded-xl p-4 shadow-[0_0_7px_6px_#02020208] dark:shadow-[0_0_2px_0_#ffffff82]">
                <div className="h-52 w-full rounded-md relative" >
                    <Image className="object-cover" src={`/${data.image}`} alt="image" fill />
                </div>

                <div className="flex flex-col h-1/2">
                    <div className="flex justify-between py-2 text-sm">
                        <span className="opacity-70">{data.date}</span>
                        <div className="flex gap-2 items-center">
                            <Image className="rounded-full" src={'/danielcodeforge.png'} alt="logo" width={20} height={20} />
                            <span className="opacity-70">{data.author}</span>
                        </div>
                    </div>

                    <div className="text-2xl font-semibold">{data.title}</div>
                    <p className="py-2 text-sm">{data.desc}</p>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard