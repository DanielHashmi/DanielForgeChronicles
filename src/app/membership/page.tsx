'use client'
import { sendSubscription } from "@/actions/actions";
import { useStore } from "@/context/context";
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";
const Membership = () => {
  const { data: session } = useSession();
  const { user_data, set_user_data } = useStore()

  const subscribe = async () => {
    if (session && !user_data?.subscribed) {
      const res = await sendSubscription(session.user.email, true);
      if (res) {
        set_user_data({ ...user_data, subscribed: true })
      }

    }
  };

  return (
    <div className="pt-[200px] text-center xl:w-[90vw] flex flex-col justify-self-center border gap-6 bg-[#f8f8f8] dark:bg-background">
      <div className="flex p-6 gap-6 flex-col items-center">
        <div className="text-4xl">Become Rare</div>

        {/* Subscription Card */}
        <div className="bg-white dark:bg-[#292a2b] flex flex-col gap-4 smooth 5 h-fit max-w-[35rem] text-start rounded-xl p-4 shadow-[0_0_7px_6px_#02020208]">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-semibold">Subscribe to Unlock Premium Content! 🎉</div>

            <p>By Subscribing you will get access to the Premium Content, We will upgrade your email and count you as our Premium Member.</p>

            <div className="flex gap-6 flex-col sm:flex-row items-start sm:items-center">
              <div className="bg-[#f8f8f8] dark:bg-background shadow outline-none w-full rounded-full px-4 py-2 flex justify-between">
                {session ? session.user.email : 'Authorize to Attach Email'}
                <Image src="/clip.svg" alt="clip-icon" width={100} height={100} className="size-5 opacity-30 dark:invert" />
              </div>

              <div className={`${!session && 'hover-container'}`}>
                <button
                  onClick={subscribe}
                  className={`${!session && 'opacity-50'} ${!user_data?.subscribed && session && 'hover:scale-105 cursor-pointer'} cursor-default rounded-full text-nowrap smooth px-6 p-2 bg-background dark:bg-[#292a2b] w-fit shadow-[0_0_7px_6px_#02020208]`}>
                  {user_data?.subscribed && session ? 'Subscribed 🥉' : 'Subscribe 🔑'}
                </button>
                <span className="tooltip">Authorize Your Email First!</span>
              </div>

            </div>
          </div>
        </div>

        {/* Authenticate Card */}
        <div className="bg-white dark:bg-[#292a2b] flex flex-col gap-4 smooth h-fit max-w-[35rem] text-start rounded-xl p-4 shadow-[0_0_7px_6px_#02020208]">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-semibold">Authentication is Required! ⚔</div>
            <p>Authentication is Required before getting access to the Subscriptions, Memberships etc.</p>
            <div className="flex gap-6 flex-col sm:flex-row items-start sm:items-center">

              <button onClick={() => session ? signOut() : signIn('google')} className="rounded-full flex gap-2 items-center text-nowrap smooth hover:bg-transparent hover:scale-105 px-6 p-2 bg-background dark:bg-[#292a2b] w-fit shadow-[0_0_7px_6px_#02020208]">
                <Image className="size-5 rounded-full" width={100} height={100} src={session?.user.image ? session.user.image : "/google svg.svg"} alt="icon/image" />
                {session ? 'Disconnect' : 'Authorize With Google'}
              </button>

              {!session ? <span className="text-red-500 px-4 sm:px-0">Not Connected!</span>
                : <span className="text-green-500 px-4 sm:px-0">Connected!</span>
              }

            </div>
          </div>
        </div >

      </div>



    </div >
  )
}

export default Membership