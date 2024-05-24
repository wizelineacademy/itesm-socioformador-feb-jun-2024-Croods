import { getUserId } from "../../../db/insertActions";
import { getServerSession } from "next-auth";
import { getSimpleUserHistory } from "../../../db/getActions";
import SearchHistoryList from "../components/History/SearchHistoryList";
import { SimpleHistoryType } from "@/app/interfaces";
import Header from "../components/Header";

export default async function Home() {
  const session = await getServerSession();
  const userId = await getUserId({ newEmail: session?.user?.email || "" });
  const history: SimpleHistoryType[] =
    (await getSimpleUserHistory({
      userId: userId,
    })) || [];

  return (
    <main className="dark:bg-backgroundDark bg-backgroundLight">
      <Header isDashboard={false} title="Search History">
        <div className="flex w-2/3">
          <SearchHistoryList history={history || []} />
        </div>
      </Header>
    </main>
  );
}
