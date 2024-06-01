import Image from "next/image";
import Header from "../../components/Header";
import P3_ResultsTable from "@/app/components/Phase3/P3_ResultsTable";
import P3_CompareButton from "@/app/components/Phase3/P3_CompareButton";
import { Results } from "@/app/interfaces/Phase3";
import { getFullSearch } from "@/app/actions/search";
import { getAllData } from "@/app/helper/cookies";
// import { example } from "./ejemplo";

export default async function Phase3() {
  const allData = getAllData();

  return (
    <div className="flex flex-col flex-1 items-center bg-backgroundLight dark:bg-backgroundDark rounded-xl h-screen overflow-y-scroll">
      <Header isDashboard={false} title="Results" />

      <div className="flex flex-col space-y-8 mt-40">
        <div className="flex items-center justify-center">
          <input
            name=""
            className="bg-black dark:bg-white rounded-2xl text-white dark:text-black text-md py-4 w-3/4 h-10 text-center shadow-lg"
            value="Enter your new search here..."
          />
          <button className="text-black dark:text-white text-4xl px-4">
            <Image
              className="relative top-0 left-0 right-0 text-black"
              src="/arrow-right.svg"
              alt="Search Arrow Right"
              width={25}
              height={20}
              priority
            />
          </button>
        </div>

        {allData.categories != undefined ? (
          <P3_ResultsTable results={allData as Results}></P3_ResultsTable>
        ) : (
          <>NO DATA</>
        )}
        <P3_CompareButton></P3_CompareButton>
      </div>
    </div>
  )
}
