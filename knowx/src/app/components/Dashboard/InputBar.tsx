"use client";
import Image from "next/image";
import { navigate } from "@/app/actions/redirect";
import { initialSearchAction, clearSearches } from "@/app/actions/search";
const InputBar = () => {
  let query: string = "";
  return (
    <div className="w-5/6 relative">
      <input
        name=""
        className="bg-black dark:bg-backgroundLight left-20 right-20 h-20 w-full rounded-lg text-white dark:text-black px-8 text-lg"
        onChange={(e) => (query = e.target.value)}
      ></input>
      <button
        className="absolute h-20 w-30 rounded-lg text-gray px-4 text-lg right-0"
        onClick={() => {
          clearSearches();
          initialSearchAction(query);
          navigate(query);
        }}
      >
        <Image
          className="relative top-0 left-0 right-0"
          src="/arrow-right.svg"
          alt="Search Arrow Right"
          width={40}
          height={30}
          priority
        />
      </button>
    </div>
  );
};

export default InputBar;
