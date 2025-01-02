// 'use client' // Not Important! because this is already being used inside a client component so it is already running on client side
import { BOOK } from "@/types/interfaces";
import BookCard from "./BookCard";

const BookCards = ({ book_data_objects_array }: { book_data_objects_array: BOOK[] }) => {
    return <div className="flex gap-6 justify-center flex-wrap">
        {book_data_objects_array.map((obj: BOOK, index: number) => (
            <div key={index}>
                <BookCard data={obj} />
            </div>
        ))}
    </div>
}

export default BookCards