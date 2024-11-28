import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex justify-center h-screen items-center text-2xl">
            <div>Oops! Page Not Found. :( <Link className="text-blue-400" href={'/'}>Go Home</Link></div>
        </div>
    );
}
