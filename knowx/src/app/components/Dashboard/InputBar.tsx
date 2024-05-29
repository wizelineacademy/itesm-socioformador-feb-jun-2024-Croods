"use client"
import Image from "next/image"
import { navigate } from "@/app/actions/redirect"
import { initialSearchAction, clearSearches } from "@/app/actions/search"
const InputBar = () => {
  let query: string = ""
  return (
    <div className="relative w-5/6">
      <input
        name=""
        className="left-20 right-20 h-20 w-full rounded-lg bg-black px-8 text-lg text-white dark:bg-backgroundLight dark:text-black"
        onChange={(e) => (query = e.target.value)}
      ></input>
      <button
        className="w-30 text-gray absolute right-0 h-20 rounded-lg px-4 text-lg"
        onClick={() => {
          clearSearches()
          initialSearchAction(query)
          navigate(query)
        }}
      >
        <Image
          className="relative left-0 right-0 top-0"
          src="/arrow-right.svg"
          alt="Search Arrow Right"
          width={40}
          height={30}
          priority
        />
      </button>
    </div>
  )
}

export default InputBar
