/* src/app/dashboard/page.tsx */
"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTheme } from "next-themes";

import UserMenu from "../components/UserMenu";
import { navigate } from "@/app/actions/redirect";
import { logSearch, getUserId } from "../../../db/schema";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/auth");
  }

  function startPhase1(query: string) {
    console.log("running");
    navigate(query);
  }

  const { resolvedTheme } = useTheme();
  const [query, setQuery] = useState<string>("");

  // const callSearchAPI = async (query: string) => {
  //   console.log(query);
  //   const u = new URLSearchParams({ topic: query });
  //   const response = await fetch("http://127.0.0.1:8000/search", {
  //     method: "POST",
  //     body: u,
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark">
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-center">
        <header className="fixed top-0 left-0 right-0 py-3 flex justify-center">
          <Image
            className="relative top-0 left-0 right-0"
            src={resolvedTheme === "light" ? "/Logo.svg" : "/LogoDark.svg"}
            alt="KnowX Logo"
            width={50}
            height={50}
            priority
          />

          <UserMenu className="absolute right-0 mr-3" />
        </header>
        <div className="w-5/6 relative">
          <input
            name=""
            className="bg-black dark:bg-backgroundLight left-20 right-20 h-20 w-full rounded-lg text-white dark:text-black px-8 text-lg"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button
            className="absolute h-20 w-30 rounded-lg text-gray px-4 text-lg right-0"
            onClick={() => startPhase1(query)}
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
      </div>
    </main>
  );
}
