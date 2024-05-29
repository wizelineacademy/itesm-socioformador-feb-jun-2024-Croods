"use client"
import React from "react"
import { P1_SearchResultProps } from "../../interfaces"
import { toggleSearchObject } from "@/app/actions/search"

const P1_SearchResult = (props: P1_SearchResultProps) => {
  return (
    <button
      key={`${props.index}`}
      className={`overflow-hidden text-ellipsis text-wrap rounded-xl px-8 py-3 text-xl  ${
        !props.isFavorite
          ? "bg-black transition duration-100 ease-in-out hover:bg-purple-300 dark:bg-backgroundLight"
          : "bg-purple-500 transition duration-100 ease-in-out"
      }`}
      onClick={() => toggleSearchObject(props.content)}
      onKeyDown={() => toggleSearchObject(props.content)}
    >
      <div className="text-center text-xl font-bold text-white dark:text-black">
        {props.content}
      </div>
    </button>
  )
}

export default P1_SearchResult
