/* src/app/dashboard/page.tsx */
import Image from "next/image";
// import { useState, useEffect } from "react";
import { checkSession } from "@/app/actions/redirect";
import { initialSearchAction, getUserIdFunc } from "@/app/actions/search";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import P1_SearchResult from "../../../components/Phase1/P1_SearchResult";
import P1_ResultsWrapper from "@/app/components/Phase1/P1_ResultsWrapper";
import { check } from "drizzle-orm/mysql-core";
import { getSearchObjectsAction } from "@/app/actions/search";
import UserMenu from "@/app/components/UserMenu";

export default async function Home({ params }: { params: { query: string } }) {
  checkSession();
  // const [resultData, setData] = useState<string[]>([]);
  // const data = await initialSearchAction(decodeURI(params.query));
  const { searchObjects, allObjects } = await getSearchObjectsAction();
  return (
    <main className="">
      <UserMenu className="absolute right-0 mr-3" />
      <P1_ResultsWrapper>
        {allObjects.map((item: string, index: number) => (
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
