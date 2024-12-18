import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Download",
    description: "This is the download page of DanielForgeChronicles, No Internet! no problem take all the resource offline.",
};

export default function NewsletterLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            {children}
        </div>
    );
}
