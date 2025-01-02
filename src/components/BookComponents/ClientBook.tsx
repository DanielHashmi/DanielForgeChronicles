'use client'
import { BLOGPOST, MD_DATA } from "@/types/interfaces"
import LoadMoreButton from "@/components/OverallComponents/LoadMoreButton"
import BookCards from "@/components/BookComponents/BookCards"
import { useState } from "react"
import { get_books } from "@/actions/actions"

const ClientBook = ({ book_data_objects_array }: { book_data_objects_array: { data: MD_DATA; content: string }[] }) => {
    const [limit, setLimit] = useState(6);
    const [initialBookData, setInitialBookData] = useState(book_data_objects_array);

    const loadMoreFunc = async () => {
        const new_book_data_objects_array = (await get_books(limit + 3) as { data: MD_DATA, content: string }[]);
        setInitialBookData(new_book_data_objects_array);
        setLimit(limit + 3);
    }

    return (
        <div className=" text-center xl:w-[90vw] flex flex-col justify-self-center border gap-6 bg-[#f8f8f8] dark:bg-background">
            <div className="flex p-6 gap-6 flex-col items-center">
                <div className="text-4xl">Books</div>
                <BookCards book_data_objects_array={initialBookData} />
                <LoadMoreButton data={initialBookData as unknown as BLOGPOST[]} loadMoreFunc={loadMoreFunc} limit={limit} />
            </div>
        </div>
    )
}

export default ClientBook