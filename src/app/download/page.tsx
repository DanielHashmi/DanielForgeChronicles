'use client'
import { useState } from "react";

let deferedPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferedPrompt = e;
})

// Some of PWA code is inside Ext_Navbar because its a client component and being rendered on all pages.

const Download = () => {
    const [downloaded, setDownloaded] = useState(localStorage.getItem('downloaded') === 'true');
    const download_DFC = async () => {
        if (deferedPrompt) {
            deferedPrompt.prompt()
            const user = await deferedPrompt.userChoice;
            if (user.outcome === 'accepted') {
                localStorage.setItem('downloaded', 'true');
                setDownloaded(true);
            }
        }
    }

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
                            <div className={`${'hover-container'}`}>
                                <button
                                    onClick={download_DFC}
                                    className={`${downloaded ? 'opacity-50 cursor-default' : 'hover:scale-105'} rounded-full text-nowrap smooth px-6 p-2 bg-background dark:bg-[#292a2b] w-fit shadow-[0_0_7px_6px_#02020208]`}>
                                    {downloaded ? 'Downloaded ✔' : 'Download 💾'}
                                </button>
                                {downloaded && <span className="tooltip">Already Downloaded & Installed (DFC)!</span>}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Download