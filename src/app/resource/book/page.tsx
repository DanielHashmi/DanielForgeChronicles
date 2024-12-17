import { MD_DATA } from "@/types/interfaces"
import { checkSubscription, get_books } from "@/actions/actions"
import { AuthOptions, getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import ClientBook from "@/components/BookComponents/ClientBook"
import { auth_options } from "../../api/auth/[...nextauth]/auth_options"

const Book = async () => {
    const session = await getServerSession(auth_options as unknown as AuthOptions);
    const status = session ? 'authenticated' : 'unauthenticated';
    const isUserSubscribed = await checkSubscription(session?.user.email);
    
    if (status === 'unauthenticated') {
        redirect('/membership');
    }
    else if (status === 'authenticated' && !isUserSubscribed) {
        redirect('/membership');
    }

    const book_data_objects_array: { data: MD_DATA, content: string }[] = await get_books(6) as unknown as { data: MD_DATA, content: string }[];

    return <ClientBook book_data_objects_array={book_data_objects_array} />
}

export default Book