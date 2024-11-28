'use client'
import { MD_DATA } from "@/types/interfaces";
import { createContext, Dispatch, ReactNode, useContext, useState } from "react"

interface PropType {
    setShow_Navigator: Dispatch<boolean>;
    show_Navigator: boolean;
    blog_data: { data: MD_DATA; content: string }[];
    setBlog_data: Dispatch<{ data: MD_DATA; content: string }[]>;
}

export const contextHook = createContext<PropType | null>(null)

export const BigProMan = ({ children }: { children: ReactNode }) => {
    const [show_Navigator, setShow_Navigator] = useState(false)
    const [blog_data, setBlog_data] = useState<{ data: MD_DATA; content: string }[]>()
    return (
        <contextHook.Provider value={{ blog_data, setBlog_data, show_Navigator, setShow_Navigator } as PropType}>
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