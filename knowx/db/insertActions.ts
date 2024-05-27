import { Profile } from "next-auth"
import { eq } from "drizzle-orm"
import { db, User, users, login_log, search_log, error_log } from "./schema"

export async function getUserId({ newEmail }: { newEmail: string }) {
  let recent = await db.select().from(users).where(eq(users.email, newEmail))
  return recent[0].id
}

export async function handleLogin({
  profile,
}: {
  profile: Profile | undefined
}) {
  if (profile == undefined) {
    return false
  }

  try {
    const uniqueUser: User[] = await db
      .select()
      .from(users)
      .where(eq(users.email, profile.email ?? ""))

    if (uniqueUser.length != 0) {
      await db.insert(login_log).values({
        userId: uniqueUser[0].id,
        accessDate: new Date(),
      })
    }

    return true
  } catch (error) {
    console.log("Error in handleLogin: ", error)

    await logError({
      userId: "xxx-xxx-xxx-xxx",
      description: String(error),
      origin: "handleLogin",
    })

    return false
  }
}

export async function logSearch({
  userId,
  search,
}: {
  userId: string
  search: string
}) {
  try {
    await db.insert(search_log).values({
      userId: userId,
      search,
      selectedTopics: "",
      selectedCategories: "",
      searchResults: "",
      timeOfSearch: new Date(),
      feedback: -1,
    })
  } catch (error) {
    await logError({
      userId,
      description: String(error),
      origin: "logSearch",
    })
  }
}

export async function logError({
  userId,
  description,
  origin,
}: {
  userId: string
  description: string
  origin: string
}) {
  await db.insert(error_log).values({
    userId: userId,
    description,
    errorTime: new Date(),
    origin,
  })
}
