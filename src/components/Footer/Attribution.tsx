import Image from "next/image";

const Attribution = () => {
    return <div className="bg-white relative dark:bg-[#292a2b] flex items-center">
        <a href="#" className="absolute bottom-4 left-4">👆</a>
        <div className="p-3 rounded-lg text-center w-full flex justify-center gap-2 text-xs sm:text-sm md:text-base">
            <span className="">
                <div className="text-center flex flex-col gap-3">
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                        <a
                            property="dct:title"
                            rel="cc:attributionURL"
                            href="https://danielforgechronicles.vercel.app"
                            className="font-semibold hover:underline"
                        >
                            DanielForgeChronicles
                        </a>
                        {" "}
                        is licensed under
                        <a
                            href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
                            target="_blank"
                            rel="license noopener noreferrer"
                            className="font-semibold hover:underline pl-1"
                        >
                            Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
                        </a>
                    </p>
                    <div className="flex justify-center items-center gap-2">
                        <Image
                            className="size-4"
                            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
                            alt="CC"
                            width={16}
                            height={16}
                        />
                        <Image
                            className="size-4"
                            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
                            alt="BY"
                            width={16}
                            height={16}
                        />
                        <Image
                            className="size-4"
                            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
                            alt="NC"
                            width={16}
                            height={16}
                        />
                        <Image
                            className="size-4"
                            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
                            alt="SA"
                            width={16}
                            height={16}
                        />
                    </div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-foreground flex justify-center gap-2 px-4">
                        All rights reserved copyrighted © 2024 DanielCodeForge <a href={'https://danielcodeforge.vercel.app'}>
                            <Image className="rounded-full" src={'/danielcodeforge.png'} alt="logo" width={25} height={25} />
                        </a>
                    </p>
                </div>
            </span>

        </div>
    </div>
};

export default Attribution;
