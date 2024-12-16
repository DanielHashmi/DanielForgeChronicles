'use server'
import clientPromise from '@/mongodb/connect';
import { BOOK_DB_DATA } from '@/types/interfaces';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import matter from 'gray-matter';
import path from 'path'
import fs from 'fs'

// Convert Markdown to HTML Function
const convertMdToHtml = async (filePath: string) => {
    const convertedData = fs.readdirSync(path.join(process.cwd(), filePath)).map((file_name: string) => {
        if (fs.existsSync(path.join(process.cwd(), filePath, file_name)) && file_name.endsWith('.md')) {
            const { data, content } = matter(fs.readFileSync(path.join(process.cwd(), filePath, file_name)))
            return { data, content }
        }
    }).sort((a, b) => Number(new Date(b.data.date)) - Number(new Date(a.data.date)));
    return convertedData;
}

// Blogs
export const get_blogs = async (limit: number) => {
    const blog_data_objects_array = await convertMdToHtml('src/blogs');
    return blog_data_objects_array.slice(0, limit);
}


// Blogs Count
export const get_blogs_count = async () => {
    const blog_data_objects_array = fs.readdirSync(path.join(process.cwd(), 'src', 'blogs'));
    return blog_data_objects_array.length || 0;
}



// Books Count
export const get_books_count = async () => {
    const book_data_objects_array = fs.readdirSync(path.join(process.cwd(), 'src', 'books'));
    return book_data_objects_array.length || 0;
}


// Books
export const get_books = async (limit: number) => {
    const book_data_objects_array = await convertMdToHtml('src/books') as BOOK_DB_DATA[];

    // save data in the DB
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");
    let filteredDBObjectsArray = (await db.collection("books").find().toArray() as unknown) as BOOK_DB_DATA[]; // db current data
    filteredDBObjectsArray = filteredDBObjectsArray.filter((dbBook) => book_data_objects_array.some((book) => book.data.slug === dbBook.data.slug))

    book_data_objects_array.forEach((dir_obj) => {
        if (!filteredDBObjectsArray.some((db_book) => db_book.data.slug === dir_obj.data.slug)) {
            filteredDBObjectsArray.push(dir_obj)
        }
    })

    // await db.collection('books').deleteMany({}); // Caution! this will dynamically delete books from db as you delete data from the directory
    filteredDBObjectsArray.forEach(async (data) => {
        const existingBook = await db.collection("books").findOne({ "data.slug": data.data.slug });
        if (!existingBook) {
            await db.collection("books").insertOne(data);
        }
    })

    const processedData = await Promise.all(book_data_objects_array.map(async (obj) => {
        obj.content = (await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeDocument)
            .use(rehypeFormat)
            .use(rehypeStringify)
            .use(rehypeAutolinkHeadings)
            .use(rehypeSlug)
            .use(rehypePrettyCode, {
                theme: 'material-theme',
                transformers: [
                    transformerCopyButton({
                        visibility: 'always',
                        feedbackDuration: 3000,
                    }),
                ],
            })
            .process(obj?.content)).toString();
        return obj;

    }))

    return processedData.slice(0, limit);
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

// Save array in database
export const saveArrayInDB = async (email: string, slug: string, arrayName: string) => { // Work Here!
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const existingBook = await db.collection("books").findOne({ "data.slug": slug });

    if (existingBook) {
        existingBook[arrayName] = existingBook[arrayName] || [];
        if (!existingBook[arrayName].includes(email)) {
            existingBook[arrayName] = [...existingBook[arrayName], email];
            await db.collection("books").updateOne({ "data.slug": slug }, { $set: { [arrayName]: existingBook[arrayName] } });
        } else {
            if (['stared_users'].includes(arrayName)) { // this will kinda toggle the user in db
                existingBook[arrayName] = existingBook[arrayName].filter((existingEmail: string) => existingEmail !== email);
                await db.collection("books").updateOne({ "data.slug": slug }, { $set: { [arrayName]: existingBook[arrayName] } });
            }
        }
        return true;
    } else {
        return false;
    }
}

// Add or Delete Star For Book
export const saveOrDeleteStar = async (email: string, slug: string) => {
    return await saveArrayInDB(email, slug, 'stared_users');
}


// Get All Users Who Has Given Star to the Book
export const getStaredUsers = async (slug: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const book_data = await db.collection("books").findOne({ "data.slug": slug });
    if (book_data?.stared_users) {
        return book_data.stared_users;
    }
    return [];
}


// Subscribe News
export const subscribeNews = async (email: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const existingUser = await db.collection("news_subscribed_users").findOne({ email });

    if (!existingUser) {
        await db.collection("news_subscribed_users").insertOne({ email });
        await sendEmail(email, 'You Have Subscribed to the Newsletter!', '', 'newsletter');
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

    const book_data = await db.collection("books").findOne({ "data.slug": slug });
    if (book_data?.claimed_users) {
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
            type === 'book_claim' && console.log(await saveArrayInDB(to, book_slug, 'claimed_users') ? 'Claimed User Has Been Saved In DB' : 'Error! Saving Claimed User To DB');
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
export const handle_send = async (e: any) => { // Work Here
    const sended = await sendEmail(process.env.COMPANY_EMAIL, 'You have received an email from <DanielForgeChronicles> User!', e.get('message'), 'message', '', { filename: '', path: '' }, e.get('email'));
    return sended;
}