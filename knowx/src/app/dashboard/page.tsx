/* src/app/dashboard/page.tsx */
// "use client";
import Image from "next/image";
import UserMenu from "../components/UserMenu";
import { checkSession } from "@/app/actions/redirect";
import InputBar from "@/app/components/Dashboard/InputBar";
import { redirect } from "next/navigation";
import Header from "../components/Header";
import { getServerSession } from "next-auth";
import { getUserId } from "../../../db/insertActions";
import { SimpleHistoryType } from "../interfaces";
import { getSimpleUserHistory } from "../../../db/getActions";

export default async function Home() {
  // const { data: session } = useSession();
  if (!(await checkSession())) {
    redirect("/auth");
  }

  const session = await getServerSession();
  const userId = await getUserId({ newEmail: session?.user?.email || "" });
  const history: SimpleHistoryType[] =
    (await getSimpleUserHistory({
      userId: userId,
    })) || [];

  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark">
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-center">
        <Header isDashboard={true}></Header>
        <InputBar history={history} />
      </div>
    </main>
  );
}
