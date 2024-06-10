"use client"
import Image, { ImageLoader } from "next/image"
import { Fragment } from "react"
import { useSession, signOut } from "next-auth/react"
import { navigateToHistory, navigateToDashboard } from "@/actions/redirect"
import { Menu, Transition } from "@headlessui/react"
import {
  ChevronDownIcon,
  ArrowLeftEndOnRectangleIcon,
  BookmarkIcon,
  HomeIcon,
} from "@heroicons/react/20/solid"

function MyDropdown({
  isDashboard = true,
  showBoth = false,
}: {
  isDashboard?: boolean
  showBoth?: boolean
}) {
  return (
    <Menu>
      <Menu.Button title="dropdown-btn">
        <ChevronDownIcon
          className="-mr-1 ml-2 h-7 w-7 text-gray-600 "
          title="dropdown-btn-icon"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-full mt-1 w-full origin-top-right divide-y divide-gray-600  rounded-md bg-[#4040401a] shadow-lg ring-1 ring-black/5 focus:outline-none">
          {(!isDashboard || showBoth) && (
            <Menu.Item>
              <div className="flex items-center text-start">
                <HomeIcon
                  className="ml-3 h-6 w-6 text-gray-600 "
                  aria-hidden="true"
                />
                <button
                  onClick={() => navigateToDashboard()}
                  className="w-full rounded-lg p-3  text-left text-gray-600"
                >
                  Dashboard
                </button>
              </div>
            </Menu.Item>
          )}

          {(isDashboard || showBoth) && (
            <Menu.Item>
              <div className="flex items-center text-start">
                <BookmarkIcon
                  className="ml-3 h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
                <button
                  title="History Button"
                  onClick={() => navigateToHistory()}
                  className="w-full rounded-lg p-3  text-left text-gray-600"
                >
                  History
                </button>
              </div>
            </Menu.Item>
          )}

          <Menu.Item>
            <div className="flex items-center text-start">
              <ArrowLeftEndOnRectangleIcon
                className="ml-3 h-6 w-6 text-gray-600 "
                aria-hidden="true"
              />
              <button
                onClick={() => signOut()}
                className="w-full rounded-lg p-3  text-left text-gray-600"
              >
                Sign out
              </button>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const myLoader: ImageLoader = ({ src }) => {
  return src
}

export default function UserMenu({
  className,
  isDashboard = true,
  showBoth = false,
}: {
  className: string
  isDashboard?: boolean
  showBoth?: boolean
}) {
  const { data: session } = useSession()

  return (
    <div
      id="UserMenu"
      title="User Menu"
      className={`flex cursor-pointer items-center justify-between ${className}`}
    >
      <div className="relative flex items-center rounded-lg bg-[#4040401a] p-3 dark:bg-[#d9d9d91a]">
        <span className="mr-2 hidden select-none text-lg font-semibold sm:block dark:text-white">
          {session?.user?.name}
        </span>
        <Image
          src={session?.user?.image || "/blankUser.png"}
          height={10}
          width={10}
          unoptimized={true}
          className="h-10 w-10 select-none rounded-full"
          alt="User Image"
          loader={myLoader}
        />
        <MyDropdown isDashboard={isDashboard} showBoth={showBoth} />
      </div>
    </div>
  )
}
