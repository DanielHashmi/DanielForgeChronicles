const Button = (props: { text: string }) => {
    return (
        <button className="rounded-full text-nowrap smooth hover:bg-transparent hover:scale-105 px-6 p-2 bg-background dark:bg-[#292a2b] w-fit shadow-[0_0_7px_6px_#02020208]">{props.text}</button>

    )
}

export default Button