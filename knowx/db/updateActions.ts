import { eq } from "drizzle-orm";
import { db, search_log } from "./schema";
import { logError } from "./insertActions";

// LOG BASED ON SEARCH ID NOT SEARCH STRING (Could be duplicated on multiple users)

export async function logGeneratedTopics({
  search,
  generatedTopics,
}: {
  search: string;
  generatedTopics: string;
}) {
  try {
    await db
      .update(search_log)
      .set({
        generatedTopics,
      })
      .where(eq(search_log.search, search));
  } catch (error) {
    await logError({
      userId: "xxx-xxx-xxx-xxx",
      description: String(error),
      origin: "logGeneratedTopics",
    });
  }
}

export async function logSearchTopics({
  search,
  selectedTopics,
}: {
  search: string;
  selectedTopics: string;
}) {
  try {
    await db
      .update(search_log)
      .set({
        selectedTopics,
      })
      .where(eq(search_log.search, search));
  } catch (error) {
    await logError({
      userId: "xxx-xxx-xxx-xxx",
      description: String(error),
      origin: "logSearchTopics",
    });
  }
}

export async function logSearchCategories({
  search,
  selectedCategories,
}: {
  search: string;
  selectedCategories: string;
}) {
  try {
    await db
      .update(search_log)
      .set({
        selectedCategories,
      })
      .where(eq(search_log.search, search));
  } catch (error) {
    await logError({
      userId: "xxx-xxx-xxx-xxx",
      description: String(error),
      origin: "logSearchCategories",
    });
  }
}

export async function logSearchResults({
  search,
  searchResults,
}: {
  search: string;
  searchResults: string;
}) {
  try {
    await db
      .update(search_log)
      .set({
        searchResults,
      })
      .where(eq(search_log.search, search));
  } catch (error) {
    await logError({
      userId: "xxx-xxx-xxx-xxx",
      description: String(error),
      origin: "logSearchResults",
    });
  }
}

export async function logGoodSearch({ logId }: { logId: number }) {
  try {
    await db
      .update(search_log)
      .set({
        id: logId,
        feedback: 1,
      })
      .where(eq(search_log.id, logId));
  } catch (error) {
    await logError({
      userId: "xxx-xxx-xxx-xxx",
      description: String(error),
      origin: "logGoodSearch",
    });
  }
}

export async function logBadSearch({ logId }: { logId: number }) {
  try {
    const result = await db
      .update(search_log)
      .set({
        feedback: 0,
      })
      .where(eq(search_log.id, logId));
  } catch (error) {
    await logError({
      userId: "dbc58b64-668e-4276-b09d-0680be73755e",
      description: String(error),
      origin: "logBadSearch",
    });
  }
}
