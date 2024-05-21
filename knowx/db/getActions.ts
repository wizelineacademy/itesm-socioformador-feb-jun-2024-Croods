import { eq } from "drizzle-orm";
import { db, search_log } from "./schema";
import { logError } from "./insertActions";
import { SimpleHistoryType } from "@/app/interfaces";

export async function getSimpleUserHistory({
  userId,
}: {
  userId: string;
}): Promise<SimpleHistoryType[] | void> {
  try {
    const history = await db
      .select({
        id: search_log.id,
        search: search_log.search,
        timestamp: search_log.timeOfSearch,
      })
      .from(search_log)
      .where(eq(search_log.userId, userId));
    return history;
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "getHistory",
    });
  }
}
