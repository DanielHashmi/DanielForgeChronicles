import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// interfaces
export interface BLOGPOST {
    title: string;
    name: string;
    date: string;
    slug: string;
    image: SanityImageSource;
    description: string;
    content: { code: string; language: string };
    author: { name: string; bio: string; slug: string; image: SanityImageSource };
}
export interface BOOK {
    title: string;
    date: string;
    slug: string;
    image: SanityImageSource;
    description: string;
    detail: object[];
    author: { name: string; bio: string; slug: string; image: SanityImageSource };
    buylink: string;
    file: { url: string; originalFilename: string };
}

export interface HEADING {
    type: 'h1' | 'h2';
    text: string;
    id: string;
}

export interface RESOURCE_SM_CARD {
    name: string;
    detail: string;
    locked: boolean;
    quality: 'FREE' | 'PREMIUM'
}

export interface USER_GOOGLE_DATA {
    name: string;
    email: string;
    image: string;
    subscribed: boolean;
    createdAt: Date,
}

export interface MAIL_OPTIONS {
    attachments: {
        filename: string;
        content: string;
    }[];
    from: string;
    to: string;
    subject: string;
    html: string;
}
