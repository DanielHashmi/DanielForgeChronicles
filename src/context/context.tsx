'use client'
import { MD_DATA, USER_GOOGLE_DATA } from "@/types/interfaces";
import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react"

interface PropType {
    setShow_Navigator: Dispatch<boolean>;
    show_Navigator: boolean;
    set_user_data: Dispatch<USER_GOOGLE_DATA>;
    user_data: USER_GOOGLE_DATA;
    blog_data: { data: MD_DATA; content: string }[];
    setBlog_data: Dispatch<{ data: MD_DATA; content: string }[]>;
    downloaded: boolean;
}

export const contextHook = createContext<PropType | null>(null);

export const BigProMan = ({ children }: { children: ReactNode }) => {
    const [show_Navigator, setShow_Navigator] = useState(false)
    const [blog_data, setBlog_data] = useState<{ data: MD_DATA; content: string }[]>()
    const [user_data, set_user_data] = useState<USER_GOOGLE_DATA>();
    const [deferedPrompt, setDeferedPrompt] = useState<Event>();
    const [downloaded, setDownloaded] = useState(localStorage.getItem('downloaded') === 'true');

    if (window) window.addEventListener('beforeinstallprompt', (e) => {
        setDeferedPrompt(e)
    })
    if (window) window.addEventListener('appinstalled', () => {
        localStorage.setItem('downloaded', 'true');
        setDownloaded(true);
    })
    useEffect(() => {
        if (deferedPrompt) {
            localStorage.removeItem('downloaded');
            setDownloaded(false);
        }
    }, [deferedPrompt])
 
    return (
        <contextHook.Provider value={{ downloaded, blog_data, setBlog_data, user_data, set_user_data, show_Navigator, setShow_Navigator } as PropType}>
            {children}
        </contextHook.Provider >

    )
}

// My Custom Hook
export const useStore = () => {
    const contextHookValue = useContext(contextHook)
    if (!contextHookValue) {
        throw new Error('Store is empty or something else occurred')
    }
    return contextHookValue
}