'use client'
import { createContext, Dispatch, ReactNode, useContext, useState } from "react"

interface PropType {
    setShow_Navigator: Dispatch<boolean>;
    show_Navigator: boolean;
}

export const contextHook = createContext<PropType | null>(null)

export const BigProMan = ({ children }: { children: ReactNode }) => {
    const [show_Navigator, setShow_Navigator] = useState(false)

    return (
        <contextHook.Provider value={{   show_Navigator, setShow_Navigator } as PropType}>
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