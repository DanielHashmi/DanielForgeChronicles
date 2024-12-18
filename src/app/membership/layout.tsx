import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Membership",
    description: "This is the membership page of DanielForgeChronicles, Level up yourself and get ahead.",
};

export default function NewsletterLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            {children}
        </div>
    );
}
