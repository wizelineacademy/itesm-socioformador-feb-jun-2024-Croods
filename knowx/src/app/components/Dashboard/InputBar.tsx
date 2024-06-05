/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { navigate } from "@/app/actions/redirect"
import { initialSearchAction, clearSearches } from "@/app/actions/search"
import { SimpleHistoryType } from "@/app/interfaces"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react"

const InputBar = ({ history }: { history: SimpleHistoryType[] | [] }) => {
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

  const router = useRouter()

  const content = (suggestion: any) => (
    <PopoverContent className="w-[240px]">
      <div className="w-full px-1 py-2">
        <div className="mt-2 flex w-full flex-col gap-2">
          <Button
            type="button"
            onClick={() => router.push(`/history/${suggestion.id}`)}
            aria-hidden="true"
          >
            Historial
          </Button>
          <Button
            onClick={() => {
              setQuery(suggestion.search || "")
              setSuggestions([])
              setIsLoading(true)
              clearSearches()
              initialSearchAction(suggestion.search)
              navigate(suggestion.search)
            }}
            aria-hidden="true"
          >
            Nueva busqueda
          </Button>
        </div>
      </div>
    </PopoverContent>
  )

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
            <Popover
              key={index}
              showArrow
              offset={10}
              placement="bottom"
              backdrop={"blur"}
            >
              <PopoverTrigger>
                <li className="flex cursor-pointer items-center justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-200">
                  <span>{suggestion.search}</span>
                  <span className="text-gray-400">
                    {suggestion.timestamp?.toLocaleString()}
                  </span>
                </li>
              </PopoverTrigger>
              {content(suggestion)}
            </Popover>
          ))}
        </ul>
      )}
    </div>
  )
}

export default InputBar
