/* src/app/dashboard/page.tsx */
import { checkSession } from "@/actions/redirect"
import InputBar from "@/components/Dashboard/InputBar"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import InfoComponent from "@/components/informational/InfoComponent"

import { getServerSession } from "next-auth"
import { getUserId } from "../../db/insertActions"
import { SimpleHistoryType } from "../../interfaces"
import { getSimpleUserHistory } from "../../db/getActions"

export default async function Home() {
  if (!(await checkSession())) {
    redirect("/auth")
  }

  const session = await getServerSession()
  const userId = await getUserId({
    newEmail: session?.user?.email || "",
  })
  const history: SimpleHistoryType[] =
    (await getSimpleUserHistory({
      userId: userId,
    })) || []

  return (
    <main id="dashboard" className="bg-backgroundLight dark:bg-backgroundDark">
      <Header isDashboard={true}>
        <div className="relative flex h-[70%] w-5/6 max-w-6xl items-center justify-center">
          <InputBar history={history} />
        </div>
      </Header>
      <InfoComponent title="Topic Search" icon={1}>
        <>
          <p>
            KnowX is a search engine that allows you to easily find information
            about services and products to compare them.
          </p>
          <br />
          <p>
            To search for a topic, simply type the name of the type of service
            or products you want to compare in the search bar above.
          </p>
          <br />
          <p>
            KnowX will navigate the web to find the most relevant information
            and allow you to select from the results for a more detailed
            comparison in the next steps.
          </p>
        </>
      </InfoComponent>
    </main>
  )
}
