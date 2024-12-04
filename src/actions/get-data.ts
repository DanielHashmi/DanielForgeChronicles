'use server'
import clientPromise from '@/mongodb/connect';
import { BOOK_DB_DATA, MD_DATA_OBJ } from '@/types/interfaces';
import fs from 'fs'
import matter from 'gray-matter';

// Blogs
export const get_blogs = async () => {
    const blog_data_objects_array = fs.readdirSync('src/blogs').map((file_name: string) => {
        if (fs.existsSync(`src/blogs/${file_name}`) && file_name.endsWith('.md')) {
            const { data } = matter(fs.readFileSync(`src/blogs/${file_name}`))
            return { data }
        }
    }).sort((a, b) => Number(new Date((b as MD_DATA_OBJ).data.date)) - Number(new Date((a as MD_DATA_OBJ).data.date))) as MD_DATA_OBJ[];

    return blog_data_objects_array;
}



// Books
export const get_books = async () => {
    const book_data_objects_array = fs.readdirSync('src/books').map((file_name: string) => {
        if (fs.existsSync(`src/books/${file_name}`) && file_name.endsWith('.md')) {
            const { data, content } = matter(fs.readFileSync(`src/books/${file_name}`))

            return { data, content }
        }
    }).sort((a, b) => Number(new Date((b as BOOK_DB_DATA).data.date)) - Number(new Date((a as BOOK_DB_DATA).data.date))) as BOOK_DB_DATA[];

    // save data in the DB
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");
    book_data_objects_array.forEach(async (data) => {
        const existingData = await db.collection("books").findOne(data);
        if (!existingData) {
            await db.collection("books").insertOne(data);
        }
    })

    return book_data_objects_array;
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
    if (existingUser.subscribed) {
        return JSON.parse(JSON.stringify(existingUser));
    } else {
        return false;
    }

}


// Add Star For Book

export const sendStar = async (slug: string, update: number) => {
    // const client = await clientPromise;
    // const db = client.db("danielforgechroniclesDB");

    // const existingBook = await db.collection("books").findOne({ slug });
    // console.log(existingBook);

    // if (existingBook) {
    //     const updatedUser = await db.collection("books").updateOne({ slug }, { $set: { star: update } });

    // } else {
    //     return false;
    // }
} 