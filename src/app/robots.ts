import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/membership', '/newsletter'],
        },
        sitemap: `${process.env.BASE_URL}/sitemap.xml`,
    }
};