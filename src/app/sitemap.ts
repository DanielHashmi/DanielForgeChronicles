import { get_urls } from '@/actions/actions';
import type { MetadataRoute } from 'next'

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