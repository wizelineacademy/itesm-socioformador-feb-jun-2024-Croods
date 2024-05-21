import { eq } from "drizzle-orm";
import { db, search_log } from "./schema";
import { logError } from "./insertActions";

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
