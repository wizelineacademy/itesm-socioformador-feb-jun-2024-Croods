import { getUserId } from "../../db/insertActions"
import { getServerSession } from "next-auth"
import { getSimpleUserHistory } from "../../db/getActions"
import SearchHistoryList from "@/components/History/SearchHistoryList"
import { SimpleHistoryType } from "@/interfaces"
import Header from "@/components/Header"
import InfoComponent from "@/components/informational/InfoComponent"
import EllipsisVerticalIcon from "@heroicons/react/20/solid/EllipsisVerticalIcon"
import TrashIcon from "@heroicons/react/20/solid/TrashIcon"
import { checkSession } from "@/actions/redirect"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

export default async function Home() {
  let history: SimpleHistoryType[] = []

  if (!(await checkSession())) {
    redirect("/auth")
  } else {
    const session = await getServerSession()
    const userId = await getUserId({ newEmail: session?.user?.email || "" })
    history =
      (await getSimpleUserHistory({
        userId: userId,
      })) || []
  }

  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark">
      <Header isDashboard={false} title="Search History">
        <div className="flex w-2/3">
          <Suspense fallback={<Loading />}>
            <SearchHistoryList history={history || []} />
          </Suspense>
        </div>
      </Header>
      <InfoComponent title="History" icon={2}>
        <>
          <p>
            The table below shows the history of your searches. You can click on
            any of the rows to view the detailed results of the search.
          </p>
          <br />
          <p>
            You can click on the table headers to sort the data in ascending or
            descending order.
          </p>
          <br />
          <p>
            Click on{" "}
            <EllipsisVerticalIcon className="inline-block h-5 w-5 text-blue-600" />{" "}
            to give feedback on the search results.
          </p>
          <br />
          <p>
            Click on <TrashIcon className="inline-block h-5 w-5 text-red-500" />{" "}
            to delete the search from your history.
          </p>
          <br />
        </>
      </InfoComponent>
    </main>
  )
}
