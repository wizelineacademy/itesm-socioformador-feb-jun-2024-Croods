import { eq, and } from "drizzle-orm"
import { db, search_log } from "./schema"
import { logError } from "./insertActions"
import { getUserId } from "./insertActions"

export async function logGeneratedTopics({
  userId,
  searchId,
  generatedTopics,
}: {
  userId: string
  searchId: number
  generatedTopics: string
}) {
  try {
    await db
      .update(search_log)
      .set({
        generatedTopics,
      })
      .where(and(eq(search_log.id, searchId), eq(search_log.userId, userId)))
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "logGeneratedTopics",
    })
  }
}

export async function logSelectedTopics({
  userId,
  searchId,
  selectedTopics,
}: {
  userId: string
  searchId: number
  selectedTopics: string
}) {
  try {
    await db
      .update(search_log)
      .set({
        selectedTopics,
      })
      .where(and(eq(search_log.id, searchId), eq(search_log.userId, userId)))
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "logSearchTopics",
    })
  }
}

export async function logGeneratedCategories({
  userId,
  searchId,
  generatedCategories,
}: {
  userId: string
  searchId: number
  generatedCategories: string
}) {
  try {
    await db
      .update(search_log)
      .set({
        generatedCategories,
      })
      .where(and(eq(search_log.id, searchId), eq(search_log.userId, userId)))
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "logGeneratedCategories",
    })
  }
}

export async function logSelectedCategories({
  userId,
  searchId,
  selectedCategories,
}: {
  userId: string
  searchId: number
  selectedCategories: string
}) {
  try {
    await db
      .update(search_log)
      .set({
        selectedCategories,
      })
      .where(and(eq(search_log.id, searchId), eq(search_log.userId, userId)))
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "logSearchCategories",
    })
  }
}

export async function logAddedCategories({
  userId,
  searchId,
  addedCategories,
}: {
  userId: string
  searchId: number
  addedCategories: string
}) {
  try {
    await db
      .update(search_log)
      .set({
        addedCategories,
      })
      .where(and(eq(search_log.id, searchId), eq(search_log.userId, userId)))
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "logAddedCategories",
    })
  }
}

export async function logSearchResults({
  userId,
  searchId,
  searchResults,
}: {
  userId: string
  searchId: number
  searchResults: string
}) {
  try {
    await db
      .update(search_log)
      .set({
        searchResults,
      })
      .where(and(eq(search_log.id, searchId), eq(search_log.userId, userId)))
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "logSearchResults",
    })
  }
}

export async function logGoodSearch({
  email,
  logId,
}: {
  email: string
  logId: number
}) {
  const userId = await getUserId({ newEmail: email })

  try {
    await db
      .update(search_log)
      .set({
        id: logId,
        feedback: 1,
      })
      .where(and(eq(search_log.id, logId), eq(search_log.userId, userId)))
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "logGoodSearch",
    })
  }
}

export async function logBadSearch({
  email,
  logId,
}: {
  email: string
  logId: number
}) {
  const userId = await getUserId({ newEmail: email })

  try {
    await db
      .update(search_log)
      .set({
        feedback: 0,
      })
      .where(and(eq(search_log.id, logId), eq(search_log.userId, userId)))
  } catch (error) {
    await logError({
      userId: userId,
      description: String(error),
      origin: "logBadSearch",
    })
  }
}
