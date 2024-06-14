import { db, search_log, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { mockFullHistory } from "../mocks/mock"

export const prepareDb = async () => {
  // Find the testing user's id
  const userId = await db
    .selectDistinct({ userId: users.id })
    .from(users)
    .where(eq(users.email, "test@gmail.com"))

  let deleteResponse: { id: number }[] = []

  // Remove all search logs from testing user
  if (userId.length > 0) {
    deleteResponse = await db
      .delete(search_log)
      .where(eq(search_log.userId, userId[0].userId))
      .returning({ id: search_log.id })
  }

  const newMockFullHistory = mockFullHistory.map((history) => ({
    ...history,
    userId: userId[0].userId,
  }))

  // Add testing search logs
  db.insert(search_log).values(newMockFullHistory).execute()
}
