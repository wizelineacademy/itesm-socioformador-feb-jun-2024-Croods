"use client";
import Image from "next/image";
import { navigate } from "@/app/actions/redirect";
import { initialSearchAction, clearSearches } from "@/app/actions/search";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { is } from "drizzle-orm";
const InputBar = () => {
  let query: string = "";

  const [isLoading, setIsLoading] = useState(false);
    
  return (
    <div className="relative w-5/6">
      <input
        name=""
        placeholder="Search for a topic..."
        className="left-20 right-20 h-20 w-full rounded-lg bg-black px-8 text-lg text-white dark:bg-backgroundLight dark:text-black"
        onChange={(e) => (query = e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsLoading(true);
            clearSearches()
            initialSearchAction(query)
            navigate(query)
          }
        }}
      ></input>
      <Button
        isLoading={isLoading}
        className="absolute h-20 w-30 rounded-none rounded-r-md px-5 right-0 border-none"
        color="default"
        variant="faded"
        onClick={() => {
          setIsLoading(true);
          clearSearches();
          initialSearchAction(query);
          navigate(query);
        }}
      >
        {!isLoading && (
          <Image
            className="relative top-0 left-0 right-0"
            src="/arrow-right.svg"
            alt="Search Arrow Right"
            width={40}
            height={30}
            priority
          />
        )}
      </Button>
    </div>
  )
}

export default InputBar
