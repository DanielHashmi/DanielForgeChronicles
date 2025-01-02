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
    detail: string[];
    author: { name: string; bio: string; slug: string; image: SanityImageSource };
}

export interface MD_DATA {
    title: string;
    author: string;
    date: string;
    slug: string;
    image: string;
    desc: string;
}
export interface BOOK_DATA extends MD_DATA {
    content: string;
}

export interface HEADING {
    type: 'h1' | 'h2';
    text: string;
    id: string;
}

export interface MD_DATA_OBJ {
    data: MD_DATA;
    content: string;
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

export interface BOOK_DB_DATA {
    stared_users: string[] | undefined;
    data: MD_DATA & { star: number };
    content: string
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
// Types
export type Convert_Md_To_Html = BOOK_DB_DATA | { data: MD_DATA }
