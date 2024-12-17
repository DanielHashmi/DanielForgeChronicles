const Button = (props: { text: string }) => {
    return (
        <div className="rounded-full cursor-pointer text-nowrap smooth hover:bg-[#f8f8f8] hover:scale-105 px-6 p-2 bg-background dark:bg-[#292a2b] w-fit shadow-[0_0_7px_6px_#02020208]">{props.text}</div>

    )
}

export default Button