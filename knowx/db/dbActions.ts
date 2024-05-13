// import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { eq } from "drizzle-orm";
import { User, old_user, login_log, search_log, error_log} from "./schema";
import { db } from "./schema";

export async function getUserId({ newEmail }: { newEmail: string }) {
  let recent = await db.select().from(old_user).where(eq(old_user.email, newEmail));
  return recent[0].id;
}

export async function handleLogin({ profile }: any) {
  try {
    const uniqueUser: User[] = await db
      .select()
      .from(old_user)
      .where(eq(old_user.email, profile.email));

    if (uniqueUser.length === 0) {
      const newUser = await db
        .insert(old_user)
        .values({
          email: profile.email,
          region: "MX",
          createdAt: new Date().toISOString(),
        })
        .returning();

      await db.insert(login_log).values({
        idUser: newUser[0].id,
        accessDate: new Date(),
      });
    } else {
      await db.insert(login_log).values({
        idUser: uniqueUser[0].id,
        accessDate: new Date(),
      });
    }

    return true;
  } catch (error) {
    console.log("Error in handleLogin: ", error);

    await logError({
      old_userId: -1,
      description: String(error),
      origin: "handleLogin",
    });

    return false;
  }
}

export async function logSearch({
  old_userId,
  search,
  feedback,
}: {
  old_userId: number;
  search: string;
  feedback: boolean;
}) {
  try {
    await db.insert(search_log).values({
      idUser: old_userId,
      search,
      timeOfSearch: new Date(),
      feedback,
    });
  } catch (error) {
    await logError({ old_userId, description: String(error), origin: "logSearch" });
  }
}

async function logError({
  old_userId,
  description,
  origin,
}: {
  old_userId: number;
  description: string;
  origin: string;
}) {
  await db.insert(error_log).values({
    idUser: old_userId,
    description,
    errorTime: new Date(),
    origin,
  });
}
