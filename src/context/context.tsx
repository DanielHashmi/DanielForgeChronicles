'use client'
import { saveData } from "@/actions/actions";
import { BLOGPOST, USER_GOOGLE_DATA } from "@/types/interfaces";
import { createContext, Dispatch, ReactNode, useContext, useEffect, useState, useCallback } from "react";

interface PropType {
    setShow_Navigator: Dispatch<boolean>;
    show_Navigator: boolean;
    set_user_data: Dispatch<USER_GOOGLE_DATA>;
    user_data: USER_GOOGLE_DATA;
    blog_data: BLOGPOST[];
    setBlog_data: Dispatch<BLOGPOST[]>;
    downloaded: boolean;
}

export const contextHook = createContext<PropType | null>(null);

export const BigProMan = ({ children }: { children: ReactNode }) => {
    const [show_Navigator, setShow_Navigator] = useState(false);
    const [blog_data, setBlog_data] = useState<BLOGPOST[]>([]);
    const [user_data, set_user_data] = useState<USER_GOOGLE_DATA>({} as USER_GOOGLE_DATA);
    const [deferedPrompt, setDeferedPrompt] = useState<Event | null>(null);
    const [downloaded, setDownloaded] = useState(localStorage.getItem('downloaded') === 'true');

    const handleBeforeInstallPrompt = useCallback((e: Event) => {
        setDeferedPrompt(e);
    }, []);

    const handleAppInstalled = useCallback(() => {
        localStorage.setItem('downloaded', 'true');
        setDownloaded(true);
    }, []);

    useEffect(() => {
        saveData(); // called to save the data from sanity to mongo
        if (window) {
            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.addEventListener('appinstalled', handleAppInstalled);
        }

        return () => {
            if (window) {
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
                window.removeEventListener('appinstalled', handleAppInstalled);
            }
        };
    }, [handleBeforeInstallPrompt, handleAppInstalled]);

    useEffect(() => {
        if (deferedPrompt) {
            localStorage.removeItem('downloaded');
            setDownloaded(false);
        }
    }, [deferedPrompt]);

    return (
        <contextHook.Provider value={{ downloaded, blog_data, setBlog_data, user_data, set_user_data, show_Navigator, setShow_Navigator }}>
            {children}
        </contextHook.Provider>
    );
};

// My Custom Hook
export const useStore = () => {
    const contextHookValue = useContext(contextHook);
    if (!contextHookValue) {
        throw new Error('Store is empty or something else occurred');
    }
    return contextHookValue;
};