import { get_urls } from '@/actions/actions';

export async function GET() {
    const blogpost_urls = await get_urls('blog'); // Expected output: Array of objects
    const book_urls = await get_urls('book');     // Expected output: Array of objects

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${process.env.BASE_URL}/resource</loc>
        </url>
        <url>
            <loc>${process.env.BASE_URL}/download</loc>
        </url>
        <url>
            <loc>${process.env.BASE_URL}/resource/blog</loc>
        </url>
        <url>
            <loc>${process.env.BASE_URL}/resource/book</loc>
        </url>
        ${blogpost_urls
            .map(item => `<url><loc>${item.url}</loc></url>`) // Extract 'url' property
            .join('')}
        ${book_urls
            .map(item => `<url><loc>${item.url}</loc></url>`) // Extract 'url' property
            .join('')}
    </urlset>`;

    return new Response(sitemap.trim(), {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
