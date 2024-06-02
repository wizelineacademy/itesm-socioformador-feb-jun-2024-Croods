"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { navigate } from "@/app/actions/redirect";
import { initialSearchAction, clearSearches } from "@/app/actions/search";

const InputBar = () => {
  // Sample array of previous searches
  const previousSearches = [
    "apple",
    "candy",
    "bar",
    "pineapple",
    "oranges are green",
    "grape",
    "watermelon",
  ];

  // State to manage the query and suggestions
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Update suggestions based on the query
  useEffect(() => {
    if (query) {
      const queryWords = query.toLowerCase().split(" ");
      const filteredSuggestions = previousSearches.filter((search) =>
        queryWords.some((word) => search.toLowerCase().includes(word))
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="w-5/6 relative">
      <input
        name="search"
        className="bg-black dark:bg-backgroundLight left-20 right-20 h-20 w-full rounded-lg text-white dark:text-black px-8 text-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
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
      {suggestions.length > 0 && (
        <ul className="absolute bg-white dark:bg-backgroundLight text-white dark:text-black mt-2 w-full rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setQuery(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputBar;
