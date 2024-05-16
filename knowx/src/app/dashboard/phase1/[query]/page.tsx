/* src/app/dashboard/page.tsx */
// import { useState, useEffect } from "react";
import { checkSession } from "@/app/actions/redirect";
import P1_SearchResult from "../../../components/Phase1/P1_SearchResult";
import P1_ResultsWrapper from "@/app/components/Phase1/P1_ResultsWrapper";
import { getSearchObjectsAction } from "@/app/actions/search";
import UserMenu from "@/app/components/UserMenu";
import { redirect } from "next/navigation";

export default async function Home({ params }: { params: { query: string } }) {
  if (!(await checkSession())) {
    redirect("/auth");
  }

  // const [resultData, setData] = useState<string[]>([]);
  // const data = await initialSearchAction(decodeURI(params.query));
  const { searchObjects, allObjects } = await getSearchObjectsAction();
  return (
    <main className="">
      <UserMenu className="absolute right-0 mr-3" />
      <P1_ResultsWrapper query={params.query}>
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
    </main>
  );
}
