import type { MetadataRoute } from 'next'
import PATH from 'path';
import fs from 'fs';

const get_urls = async (dir: string) => {
    const path = PATH.join(process.cwd(), 'src', dir + 's');
    const urls = fs.readdirSync(path, 'utf-8').map((name) => (
        {
            url: `${process.env.BASE_URL}/resource/${dir}/${name.replace(/\.md$/, '')}`,
        }
    ));
    return urls;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogpost_urls = await get_urls('blog');
    const book_urls = await get_urls('book');
    return [
        {
            url: `${process.env.BASE_URL}/resource`,
        },
        {
            url: `${process.env.BASE_URL}/newsletter`,
        },
        {
            url: `${process.env.BASE_URL}/download`,
        },
        {
            url: `${process.env.BASE_URL}/membership`,
        },
        {
            url: `${process.env.BASE_URL}/resource/blog`,
        },
        {
            url: `${process.env.BASE_URL}/resource/book`,
        },
        ...blogpost_urls,
        ...book_urls,
    ]
}