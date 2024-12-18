import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resource",
    description: "These are the resources from DanielForgeChronicles, Exclusive, Human Written, Free and Subscription based resources are available.",
};

export default function NewsletterLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            {children}
        </div>
    );
}
