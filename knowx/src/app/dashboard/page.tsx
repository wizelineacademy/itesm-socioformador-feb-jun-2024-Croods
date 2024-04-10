"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState<string>("");

  const callSearchAPI = async (query: string) => {
    console.log(query);
    const response = await fetch("http://127.0.0.1:8000/search", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
  };

  return (
    <main className="bg-backgroundLight">
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-center">
        <section className="fixed top-0 left-0 right-0 py-3 flex justify-center">
          <Image
            className="relative top-0 left-0 right-0"
            src="/Logo.svg"
            alt="Next.js Logo"
            width={100}
            height={100}
            priority
          />
        </section>
        <div className="w-5/6 relative">
          <input
            name=""
            className="bg-black left-20 right-20 h-20 w-full rounded-lg text-white px-8 text-lg"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button
            className="absolute h-20 w-30 rounded-lg text-gray px-4 text-lg right-0"
            onClick={() => callSearchAPI(query)}
          >
            <Image
              className="relative top-0 left-0 right-0"
              src="/arrow-right.svg"
              alt="Search Arrow"
              width={40}
              height={30}
              priority
            />
          </button>
        </div>
      </div>
    </main>
  );
}
