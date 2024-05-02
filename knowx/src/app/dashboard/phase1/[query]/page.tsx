/* src/app/dashboard/page.tsx */
import Image from "next/image";
// import { useState, useEffect } from "react";
import { checkSession } from "@/app/actions/redirect";
import { initialSearch, getUserIdFunc } from "@/app/actions/search";
import P1_SearchResult from "../../../components/Phase1/P1_SearchResult";
import P1_ResultsWrapper from "@/app/components/Phase1/P1_ResultsWrapper";
import { check } from "drizzle-orm/mysql-core";
import { getSearchObjectsAction } from "@/app/actions/search";

export default async function Home({ params }: { params: { query: string } }) {
  checkSession();
  // const [resultData, setData] = useState<string[]>([]);
  const data = await initialSearch(decodeURI(params.query));
  const searchObjects = await getSearchObjectsAction();
  return (
    <main className="">
      <h1 className="mx-auto w-fit text-center mt-10 text-3xl">
        Choose search items
      </h1>
      <P1_ResultsWrapper>
        {data.map((item: string, index: number) => (
          <P1_SearchResult
            content={item}
            index={index}
            isFavorite={searchObjects.includes(item)}
            // willSearch={toggleSelect}
            key={index}
          />
        ))}
      </P1_ResultsWrapper>
      {/* {searchAmount === 0 ? (
        <div className="text-center mx-auto">ALL</div>
      ) : (
        <div className="text-center mx-auto">SOME {searchAmount}</div>
      )} */}
    </main>
  );
}
