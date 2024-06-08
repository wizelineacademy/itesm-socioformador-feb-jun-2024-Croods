import { eq } from "drizzle-orm"
import { db, search_log } from "./schema"
import { logError } from "./insertActions"

export async function deleteSearchLog({ logId }: { logId: number }) {
  try {
    await db.delete(search_log).where(eq(search_log.id, logId))
  } catch (error) {
    await logError({
      userId: "xxx-xxx-xxx-xxx",
      description: String(error),
      origin: "deleteSearchLog",
    })
  }
}
