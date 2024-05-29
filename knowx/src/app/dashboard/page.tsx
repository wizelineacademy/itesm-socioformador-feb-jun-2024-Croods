/* src/app/dashboard/page.tsx */
import { checkSession } from "@/app/actions/redirect"
import InputBar from "@/app/components/Dashboard/InputBar"
import { redirect } from "next/navigation"
import Header from "../components/Header"

export default async function Home() {
  if (!(await checkSession())) {
    redirect("/auth")
  }

  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark">
      <Header isDashboard={true}>
        <div className="relative flex h-[70%] w-5/6 max-w-6xl items-center justify-center">
          <InputBar></InputBar>
        </div>
      </Header>
    </main>
  )
}
