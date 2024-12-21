import Link from "next/link";

export default function offline() {
  return (
    <div className="flex justify-center h-[50vh] items-center text-2xl">
      <div>Oops! It seems like this page was not saved for offline. :( <Link className="text-blue-400" href={'/'}>Go Home</Link></div>
    </div>
  );
}
