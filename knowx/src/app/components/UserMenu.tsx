"use client"
import { useSession, signOut } from "next-auth/react";
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function MyDropdown() {
  return (
    <Menu>
      <Menu.Button>
        <ChevronDownIcon
              className="-mr-1 ml-2 h-7 w-7 text-gray-600 dark:text-white"
              aria-hidden="true"
            />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-32 w-full origin-top-right divide-y bg-[#4040401a] dark:bg-[#d9d9d91a] divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
        <Menu.Item>
            <button onClick={() => signOut()} className="p-3 rounded-lg w-full font-semibold text-gray-600 dark:text-white">
              Logout
          </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}


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
        <MyDropdown />
      </div>

    </div>
  );
}