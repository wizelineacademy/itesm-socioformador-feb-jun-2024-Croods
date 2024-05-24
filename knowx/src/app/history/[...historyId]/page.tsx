import { getFullUserHistory } from "../../../../db/getActions";
import { getServerSession } from "next-auth";
import { getUserId } from "../../../../db/insertActions";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/app/components/Header";
import HistoryOverview from "@/app/components/History/HistoryOverview";

export default async function Home({
  params,
}: {
  params: { historyId: string };
}) {
  const session = await getServerSession();
  const userId = await getUserId({ newEmail: session?.user?.email || "" });

  const history = await getFullUserHistory({
    userId,
    logId: params.historyId,
  });

  if (!history) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <main className="bg-backgroundLight dark:bg-backgroundDark">
        <Header
          isDashboard={false}
          userMenuShowBoth={true}
          title="Search History"
        >
          <HistoryOverview history={history} />
        </Header>
      </main>
    </Suspense>
  );
}
