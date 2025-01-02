// 'use client' // Not Important! because this is already being used inside a client component so it is already running on client side
import { BLOGPOST } from "@/types/interfaces"
import Button from "./Button"

const LoadMoreButton = ({ data, loadMoreFunc, limit }: { data: BLOGPOST[], loadMoreFunc: () => void, limit: number }) => {

    return <div>
        {limit > (data.length + 3) && data.length != 0 ? "That's It! 🤷‍♂️" : !data.length ? "No Such Thing Available! 🙄" : <div onClick={loadMoreFunc} >
            <Button text='Load More' />
        </div>}
    </div>
}

export default LoadMoreButton