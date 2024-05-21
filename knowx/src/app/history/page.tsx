import { getUserId } from "../../../db/insertActions";
import { getServerSession } from "next-auth";
import { getSimpleUserHistory } from "../../../db/getActions";
import SearchHistoryList from "../components/History/SearchHistoryList";
import Image from "next/image";
import UserMenu from "../components/UserMenu";
import { SimpleHistoryType } from "@/app/interfaces";
import Header from "../components/Header";

export default async function Home() {
  const session = await getServerSession();
  const userId = await getUserId({ newEmail: session?.user?.email || "" });
  const history: SimpleHistoryType[] | void = await getSimpleUserHistory({
    userId: userId,
  });

  return (
    <main className="dark:bg-backgroundDark bg-backgroundLight">
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-center">
        <Header isDashboard={false} />

        <div className="flex flex-col items-center space-y-5">
          <h1 className="text-4xl font-bold text-backgroundDark dark:text-backgroundLight">
            Search History
          </h1>
          <SearchHistoryList history={history || []} />
        </div>
      </div>
    </main>
  );
}
