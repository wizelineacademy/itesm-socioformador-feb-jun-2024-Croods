import { and, eq } from "drizzle-orm"
import { search_log } from "./schema"
import { logError } from "./insertActions"
import { SimpleHistoryType, FullHistoryType } from "@/interfaces"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

export async function getSimpleUserHistory({
  userId,
}: {
  userId: string
}): Promise<SimpleHistoryType[] | void> {
  try {
    const pool = neon(process.env.DB_URL!)
    const db = drizzle(pool)

    const history = await db
      .select({
        id: search_log.id,
        search: search_log.search,
        timestamp: search_log.timeOfSearch,
        feedback: search_log.feedback,
      })
      .from(search_log)
      .where(eq(search_log.userId, userId))
    return history
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "getHistory",
    })
  }
}

export async function getFullUserHistory({
  userId,
  logId,
}: {
  userId: string
  logId: string
}): Promise<FullHistoryType | undefined> {
  try {
    const pool = neon(process.env.DB_URL!)
    const db = drizzle(pool)

    const history = await db
      .select()
      .from(search_log)
      .where(
        and(eq(search_log.id, parseInt(logId)), eq(search_log.userId, userId)),
      )

    if (history.length > 0) {
      return history[0]
    }

    return undefined
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "getHistory",
    })
  }
}
