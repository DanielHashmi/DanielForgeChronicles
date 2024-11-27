"use client"
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Set mounted to true to ensure that the client-side logic is only applied after the first render
        setMounted(true);
    }, []);

    // If not mounted yet, return null to avoid hydration mismatch
    if (!mounted) {
        return null;
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
