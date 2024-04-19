"use client"
import { useSession, signOut } from "next-auth/react";

export default function UserMenu({className}: {className: string}) {
  const { data: session } = useSession();

  return (
    <div className={`flex justify-between items-center cursor-pointer ${className}`}>
      <div className="flex items-center p-3 rounded-lg bg-[#4040401a] dark:bg-[#d9d9d91a]">
        <span className="hidden sm:block mr-2 text-lg font-semibold dark:text-white select-none">{session?.user?.name}</span>
        <img
          src={session?.user?.image || "/user.svg"}
          className="w-10 h-10 rounded-full select-none"
          alt="User"
        />
      </div>

      <button onClick={() => signOut()} className="p-3 rounded-lg bg-[#4040401a] dark:bg-[#d9d9d91a]">
        logout
      </button>
    </div>
  );
}