import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Newsletter",
    description: "This is the newsletter page of DanielForgeChronicles, Get informed with latest updates.",
};

export default function NewsletterLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            {children}
        </div>
    );
}
