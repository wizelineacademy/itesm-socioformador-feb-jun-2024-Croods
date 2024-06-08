import Image from "next/image"
import Header from "@/components/Header"
import P3_ResultsTable from "@/components/Phase3/P3_ResultsTable"
import P3_CompareButton from "@/components/Phase3/P3_CompareButton"
import { Results } from "@/interfaces/Phase3"
import { getAllData } from "@/helper/cookies"

export default async function Phase3() {
  const allData = getAllData()

  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark">
      <Header isDashboard={false} title="Results">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-center">
            <input
              name=""
              className="text-md h-10 w-3/4 rounded-2xl bg-black py-4 text-center text-white shadow-lg dark:bg-white dark:text-black"
              value="Enter your new search here..."
            />
            <button className="px-4 text-4xl text-black dark:text-white">
              <Image
                className="relative left-0 right-0 top-0 text-black"
                src="/arrow-right.svg"
                alt="Search Arrow Right"
                width={25}
                height={20}
                priority
              />
            </button>
          </div>

          {allData.categories != undefined ? (
            <P3_ResultsTable
              incoming_results={allData as Results}
            ></P3_ResultsTable>
          ) : (
            <>NO DATA</>
          )}
          <P3_CompareButton></P3_CompareButton>
        </div>
      </Header>
    </div>
  )
}
