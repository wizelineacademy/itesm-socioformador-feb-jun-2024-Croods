/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client"
import Image from "next/image"
import { navigate } from "@/app/actions/redirect"
import { initialSearchAction, clearSearches } from "@/app/actions/search"
import { Button } from "@nextui-org/react"

import React, { useState, useEffect } from "react"
import { SimpleHistoryType } from "@/app/interfaces"

const InputBar = ({ history }: { history: SimpleHistoryType[] | [] }) => {
  //let query: string = ""
  // State to manage the query and suggestions
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SimpleHistoryType[]>(history)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query && history && history.length > 0) {
      const queryWords = query.toLowerCase().split(" ")
      const filteredSuggestions = history.filter((search) =>
        queryWords.some((word) => search.search?.toLowerCase().includes(word)),
      )
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query, history])

  return (
    <div className="relative w-5/6">
      <input
        name="search"
        placeholder="Search for a topic..."
        className="left-20 right-20 h-20 w-full rounded-lg bg-black px-8 text-lg text-white dark:bg-backgroundLight dark:text-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsLoading(true)
            clearSearches()
            initialSearchAction(query)
            navigate(query)
          }
        }}
        /*
        onChange={(e) => (query = e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsLoading(true)
            clearSearches()
            initialSearchAction(query)
            navigate(query)
          }
        }}
        */
      ></input>
      <Button
        isLoading={isLoading}
        className="w-30 absolute right-0 h-20 rounded-none rounded-r-md border-none px-5 dark:dark"
        color="default"
        variant="faded"
        onClick={() => {
          setIsLoading(true)
          clearSearches()
          initialSearchAction(query)
          navigate(query)
        }}
        aria-hidden="true"
      >
        {!isLoading && (
          <Image
            className="relative left-0 right-0 top-0"
            src="/arrow-right.svg"
            alt="Search Arrow Right"
            width={40}
            height={30}
            priority
          />
        )}
      </Button>

      {history && history.length > 0 && suggestions.length > 0 && (
        <ul className="absolute mt-2 w-full rounded-lg bg-white text-white shadow-lg dark:bg-backgroundLight dark:text-black">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-200"
              onClick={() => {
                setQuery(suggestion.search || "")
                setSuggestions([])
              }}
              aria-hidden="true"
            >
              {suggestion.search}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default InputBar
