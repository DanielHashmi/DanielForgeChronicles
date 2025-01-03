import Image from "next/image"
import Button from "../OverallComponents/Button"

const Demo = () => {
    return (
        <div className="lg:h-[70vh] md:h-fit h-[70vh] p-6 md:p-12 lg:px-0 lg:py-6 flex flex-col lg:flex-row lg:mt-20 items-center overflow-hidden">
            <div className="lg:w-1/2">
                <div className="flex flex-col gap-6 text-center lg:text-start lg:pl-16 2xl:px-20">
                    <div className="flex flex-col">
                        <span className="text-4xl sm:text-5xl md:text-7xl font-bold">Subsidiary of</span>
                        <span className="text-4xl sm:text-5xl md:text-7xl font-bold opacity-50 underline">DanielCodeForge</span>
                    </div>

                    <a href={'https://danielcodeforge.vercel.app/'} className="text-base font-normal flex gap-6 justify-center lg:justify-start items-center">
                        <Button text="Visit" />
                        <span>{'<-- Source Website'}</span>
                    </a>
                </div>
            </div>
            <Image className="object-cover shadow-[0_0_20px_0px_#00000085] mt-6 lg:mt-0 relative left-8 md:left-20 object-left rounded-l-3xl h-full lg:w-1/2" src={`/DanielCodeForgeTemp.png`} alt="image" width={1920} height={1080} />
        </div>
    )
}

export default Demo