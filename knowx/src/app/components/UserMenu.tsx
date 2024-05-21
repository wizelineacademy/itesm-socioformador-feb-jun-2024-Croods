"use client";
import Image, { ImageLoader } from "next/image";
import { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import { navigateToHistory, navigateToDashboard } from "../actions/redirect";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ArrowLeftEndOnRectangleIcon,
  BookmarkIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";

function MyDropdown({ isDashboard = true }: { isDashboard?: boolean }) {
  return (
    <Menu>
      <Menu.Button>
        <ChevronDownIcon
          className="-mr-1 ml-2 h-7 w-7 text-gray-600 "
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
        <Menu.Items className="absolute right-0 top-full mt-1 w-full origin-top-right divide-y bg-[#4040401a]  divide-gray-600 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
          {!isDashboard && (
            <Menu.Item>
              <div className="flex items-center text-start">
                <HomeIcon
                  className="ml-3 h-6 w-6 text-gray-600 "
                  aria-hidden="true"
                />
                <button
                  onClick={() => navigateToDashboard()}
                  className="p-3 rounded-lg text-gray-600  w-full text-left"
                >
                  Dashboard
                </button>
              </div>
            </Menu.Item>
          )}

          {isDashboard && (
            <Menu.Item>
              <div className="flex items-center text-start">
                <BookmarkIcon
                  className="ml-3 h-6 w-6 text-gray-600 "
                  aria-hidden="true"
                />
                <button
                  onClick={() => navigateToHistory()}
                  className="p-3 rounded-lg text-gray-600  w-full text-left"
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
                className="p-3 rounded-lg text-gray-600  w-full text-left"
              >
                Sign out
              </button>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const myLoader: ImageLoader = ({ src }) => {
  return src;
};

export default function UserMenu({
  className,
  isDashboard = true,
}: {
  className: string;
  isDashboard?: boolean;
}) {
  const { data: session } = useSession();

  return (
    <div
      className={`flex justify-between items-center cursor-pointer ${className}`}
    >
      <div className="flex relative items-center p-3 rounded-lg bg-[#4040401a] dark:bg-[#d9d9d91a]">
        <span className="hidden sm:block mr-2 text-lg font-semibold dark:text-white select-none">
          {session?.user?.name}
        </span>
        <Image
          src={session?.user?.image || "/blankUser.png"}
          height={10}
          width={10}
          className="w-10 h-10 rounded-full select-none"
          alt="User Image"
          loader={myLoader}
        />
        <MyDropdown isDashboard={isDashboard} />
      </div>
    </div>
  );
}
