/* src/app/dashboard/page.tsx */
"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import P1_SearchResult from "../../components/Phase1/P1_SearchResult";
import P1_ResultsWrapper from "@/app/components/Phase1/P1_ResultsWrapper";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/auth");
  }

  let initialSearchList = new Array(5).fill("");
  const [searchAmount, setSearchAmount] = useState(0);
  const [searchList, setSearchList] = useState(initialSearchList);

  const toggleSelect = (index: number, content: string) => {
    if (searchList[index] === "") {
      const nextList = searchList.map((l: string, i: number) => {
        if (i === index) {
          // Increment the clicked counter
          return `${index === 0 ? content : ", " + content}`;
        } else {
          // The rest haven't changed
          return l;
        }
      });
      // searchList[index] = ` ${index}${content}`;
      console.log(nextList.join(""));
      setSearchList(nextList);
      setSearchAmount(searchAmount + 1);
    } else {
      const nextList = searchList.map((l: string, i: number) => {
        if (i === index) {
          // Increment the clicked counter
          return "";
        } else {
          // The rest haven't changed
          return l;
        }
      });
      // searchList[index] = ` ${index}${content}`;
      setSearchList(nextList);
      console.log(nextList.join(""));
      setSearchAmount(searchAmount - 1);
    }
    // console.log(searchList);
  };

  return (
    <main className="">
      <h1 className="mx-auto w-fit text-center mt-10 text-3xl">
        Choose search items
      </h1>
      <P1_ResultsWrapper>
        <P1_SearchResult content="Smtn" index={0} willSearch={toggleSelect} />
        <P1_SearchResult content="Smtn" index={1} willSearch={toggleSelect} />
        <P1_SearchResult content="Smtn" index={2} willSearch={toggleSelect} />
        <P1_SearchResult content="Smtn" index={3} willSearch={toggleSelect} />
        <P1_SearchResult content="Smtn" index={4} willSearch={toggleSelect} />
      </P1_ResultsWrapper>
      {searchAmount === 0 ? (
        <div className="text-center mx-auto">ALL</div>
      ) : (
        <div className="text-center mx-auto">SOME {searchAmount}</div>
      )}
    </main>
  );
}
