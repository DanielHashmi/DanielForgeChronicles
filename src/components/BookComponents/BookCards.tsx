// 'use client' // Not Important! because this is already being used inside a client component so it is already running on client side
import { MD_DATA } from "@/types/interfaces";
import BookCard from "./BookCard";

const BookCards = ({ book_data_objects_array }: { book_data_objects_array: { data: MD_DATA; content: string }[] }) => {
    return <div className="flex gap-6 justify-center flex-wrap">
        {book_data_objects_array.map((obj: { data: MD_DATA; content: string }, index: number) => (
            <div key={index}>
                <BookCard data={{ ...obj.data, content: obj.content }} />
            </div>
        ))}
    </div>
}

export default BookCards