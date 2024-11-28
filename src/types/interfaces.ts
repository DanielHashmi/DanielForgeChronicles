export interface MD_DATA {
    title: string;
    author: string;
    date: string;
    slug: string;
    image: string;
    desc: string;
}

export interface Heading {
    type: 'h1' | 'h2';
    text: string;
    id: string;
}