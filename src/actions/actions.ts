'use server'
import clientPromise from '@/mongodb/connect';
import { BLOGPOST, BOOK } from '@/types/interfaces';
import { generateEmail } from '@/lib/functions';
import { client } from '@/sanity/utils/client';
import { all_blogs_query, all_books_query } from '@/sanity/grok/queries';

// Blogs
export const get_blogs = async (limit: number) => {
    const blog_data_objects_array: BLOGPOST[] = await client.fetch(all_blogs_query);
    return blog_data_objects_array.slice(0, limit);
}


// Blogs Count
export const get_blogs_count = async () => {
    const blog_data_objects_array: BLOGPOST[] = await client.fetch(`*[_type == 'blogpost']`);
    return blog_data_objects_array.length || 0;
}



// Books Count
export const get_books_count = async () => {
    const book_data_objects_array: BOOK[] = await client.fetch(`*[_type == 'book']`);
    return book_data_objects_array.length || 0;
}


// Books
export const get_books = async (limit: number) => {
    const book_data_objects_array: BOOK[] = await client.fetch(all_books_query);
    return book_data_objects_array.slice(0, limit);
}


// Add subscription
export const sendSubscription = async (email: string, subscribe: boolean) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const updatedUser = await db.collection("user_data_by_google").updateOne({ email: email }, { $set: { subscribed: subscribe } });
    if (updatedUser) {
        return updatedUser;
    } else {
        return undefined;
    }
}


// Check Subscription
export const checkSubscription = async (email: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const existingUser = await db.collection("user_data_by_google").findOne({ email: email });
    if (existingUser?.subscribed) {
        return JSON.parse(JSON.stringify(existingUser));
    } else {
        return false;
    }
}

// Dynamic mongo with sanity
export const saveData = async () => {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("danielforgechroniclesDB");
    const books_slugs: string[] = await client.fetch(`*[_type == 'book'].slug.current`); // sanity

    books_slugs.forEach(async (slug) => {
        const db_book = await db.collection("books").findOne({ "slug": slug });
        if (!db_book) {
            await db.collection("books").insertOne({ slug: slug, 'stared_users': [], 'claimed_users': [] });
        }
    })
}


// Add or Delete Star For Book
export const saveOrDeleteStar = async (email: string, slug: string) => {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("danielforgechroniclesDB");

    // Use $addToSet or $pull to toggle
    const book = await db.collection("books").findOne({ slug });
    if (!book) {
        throw new Error("Book not found");
    }

    const updateOperation: any = book.stared_users.includes(email)
        ? { $pull: { stared_users: email } } // Remove user if already exists
        : { $addToSet: { stared_users: email } }; // Add user if not exists

    const result = await db.collection("books").updateOne({ slug }, updateOperation);

    return {
        success: result.modifiedCount > 0,
        action: book.stared_users.includes(email) ? "removed" : "added",
    };
};


// Save claimed user
export const saveClaimedUser = async (email: string, slug: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");
    const book = await db.collection("books").findOne({ "slug": slug });
    if (book) {
        if (!book.claimed_users.includes(email)) {
            await db.collection("books").updateOne({ "slug": slug }, { $set: { 'claimed_users': [...book.claimed_users, email] } });
        }
    }
}


// Get All Users Who Has Given Star to the Book
export const getStaredUsers = async (slug: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");
    const book_data = await db.collection("books").findOne({ "slug": slug });
    if (book_data) {
        return book_data.stared_users;
    }
    return [];
}


// Subscribe News
export const subscribeNews = async (email: string, name: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const existingUser = await db.collection("news_subscribed_users").findOne({ email });

    if (!existingUser) {
        await db.collection("news_subscribed_users").insertOne({ email });
        await sendEmail(email, 'You Have Subscribed to the Newsletter!', generateEmail(name, 'book_claim'), 'newsletter');
        return true;
    } else if (existingUser) {
        await db.collection("news_subscribed_users").deleteOne({ email });
        await sendEmail(email, 'You Have Unsubscribed to the Newsletter!', generateEmail(name, 'newsletter'), 'newsletter');
        return true;
    }
}

// Check Subscribe News
export const checkSubscribeNews = async (email: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");
    const existingUser = await db.collection("news_subscribed_users").findOne({ email });
    return existingUser ? true : false;
}

// Get Claimed Users
export const getClaimedUsers = async (slug: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const book_data = await db.collection("books").findOne({ "slug": slug });
    if (book_data) {
        return book_data.claimed_users;
    }
    return [];
}

// Send Email // how sendEmail Function is working above, even though it is defined here at the bottom still iam able to access it above how?
export const sendEmail = async (to: string, subject: string, html: string, type: 'newsletter' | 'book_claim' | 'message', book_slug?: string, attachment?: { filename: string; path: string }, from?: string) => {
    try {
        const response = await fetch(process.env.BASE_URL + "/api/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to,
                subject,
                html,
                attachment,
                from,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Email sent successfully!"); // Work Here!
            return true;
        } else {
            console.error("Failed to send email! --> " + data.error);
            return false;
        }
    } catch (error) {
        console.log("An error occurred. --> " + error);
        return false;
    }
}

// Server action for the send email and message form
export const handle_send = async (e: FormData) => { // Work Here
    const sended = await sendEmail(process.env.COMPANY_EMAIL, 'You have received an email from <DanielForgeChronicles> User!', e.get('message') as string | null, 'message', undefined, undefined, e.get('email') as string | null);
    return sended;
}

// urls for generating sitemap work here
export const get_urls = async (of: string) => {
    const urls: { url: string }[] = (await client.fetch(`*[_type == '${of === 'blog' ? 'blogpost' : of}'].slug.current`) as string[]).map((slug) => {
        return {
            url: `${process.env.BASE_URL}/resource/${of}/${slug}`,
        }
    });
    return urls;
}
