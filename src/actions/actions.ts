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
    let allCurrentBooksInDB: BOOK_DB_DATA[] = (await db.collection("books").find().toArray() as unknown) as BOOK_DB_DATA[]; // db current data
    allCurrentBooksInDB = allCurrentBooksInDB.filter((dbBook) => book_data_objects_array.some((book) => book.data.slug === dbBook.data.slug))

    book_data_objects_array.forEach((dir_obj) => {
        if (!allCurrentBooksInDB.some((db_book) => db_book.data.slug === dir_obj.data.slug)) {
            allCurrentBooksInDB.push(dir_obj)
        }
    })

    // await db.collection('books').deleteMany({}); Caution! this will dynamically delete books from db as you delete data from the directory
    allCurrentBooksInDB.forEach(async (data) => {
        const existingBook = await db.collection("books").findOne({ "data.slug": data.data.slug });
        if (!existingBook) {
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


// Add or Delete Star For Book

export const saveOrDeleteStar = async (email: string, slug: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const existingBook = await db.collection("books").findOne({ "data.slug": slug });

    if (existingBook) {
        existingBook.stared_users = existingBook.stared_users || [];
        if (!existingBook.stared_users.includes(email)) {
            existingBook.stared_users = [...existingBook.stared_users, email];
            await db.collection("books").updateOne({ "data.slug": slug }, { $set: { stared_users: existingBook.stared_users } });
        } else {
            existingBook.stared_users = existingBook.stared_users.filter((existingEmail: string) => existingEmail !== email);
            await db.collection("books").updateOne({ "data.slug": slug }, { $set: { stared_users: existingBook.stared_users } });
        }
    } else {
        return false;
    }
}




// Check Star Exists
export const checkStar = async (email: string, slug: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const existingBook = await db.collection("books").findOne({ "data.slug": slug });

    if (existingBook.stared_users && existingBook.stared_users.includes(email)) {
        return true
    }
    return false;
}


// Check Star Count
export const getStarCount = async (email: string, slug: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const book_data = await db.collection("books").findOne({ "data.slug": slug });
    if (book_data) {
        return book_data.stared_users.length;
    }
    return 0;
}



// Subscribe News
export const subscribeNews = async (email: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const existingUser = await db.collection("news_subscribed_users").findOne({ email });

    if (!existingUser) {
        await db.collection("news_subscribed_users").insertOne({ email });
        return true;
    }
}
// Check Subscribe News
export const checkSubscribeNews = async (email: string) => {
    const client = await clientPromise;
    const db = client.db("danielforgechroniclesDB");

    const existingUser = await db.collection("news_subscribed_users").findOne({ email });

    if (existingUser) {
        return true;
    } else {
        return false;
    }
}