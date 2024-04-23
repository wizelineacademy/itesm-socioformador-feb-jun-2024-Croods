import {
  pgTable,
  serial,
  date,
  varchar,
  integer,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  region: varchar("region", { length: 20 }),
  createdAt: date("createdAt"),
});

export const search_log = pgTable("search_log", {
  id: serial("id").primaryKey(),
  idUser: integer("idUser").references(() => user.id),
  search: varchar("search", { length: 128 }),
  timeOfSearch: timestamp("timeOfSearch", { withTimezone: true }),
  feedback: boolean("feedback"),
});

export const login_log = pgTable("login_log", {
  id: serial("id").primaryKey(),
  idUser: integer("userId").references(() => user.id),
  accessDate: timestamp("accessDate", { withTimezone: true }),
});

export const error_log = pgTable("error_log", {
  id: serial("id").primaryKey(),
  idUser: integer("userId").references(() => user.id),
  description: text("description"),
  errorTime: timestamp("errorTime", { withTimezone: true }),
  origin: varchar("origin", { length: 100 }),
});

export type User = typeof user.$inferSelect;
export type SearchLog = typeof search_log.$inferSelect;
export type LoginLog = typeof login_log.$inferSelect;
export type ErrorLog = typeof error_log.$inferSelect;

export async function getUserId({ email }: { email: string }) {
  const queryClient = postgres(
    `postgres://postgres:${process.env.DB_PASSWORD ?? ""}@0.0.0.0:5432/KnowX`
  );
  const db = drizzle(queryClient);

  let recent = await db.select().from(user).where(eq(user.email, email));
  return recent[0].id;
}

export async function handleLogin({ profile }: any) {
  try {
    const queryClient = postgres(
      `postgres://postgres:${process.env.DB_PASSWORD ?? ""}@0.0.0.0:5432/KnowX`
    );
    const db = drizzle(queryClient);

    const uniqueUser: User[] = await db
      .select()
      .from(user)
      .where(eq(user.email, profile.email));

    if (uniqueUser.length === 0) {
      const newUser = await db
        .insert(user)
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
    await logError({
      userId: -1,
      description: String(error),
      origin: "handleLogin",
    });
    return false;
  }
}

export async function logSearch({
  userId,
  search,
  feedback,
}: {
  userId: number;
  search: string;
  feedback: boolean;
}) {
  try {
    const queryClient = postgres(
      `postgres://postgres:${process.env.DB_PASSWORD ?? ""}@0.0.0.0:5432/KnowX`
    );
    const db = drizzle(queryClient);

    await db.insert(search_log).values({
      idUser: userId,
      search,
      timeOfSearch: new Date(),
      feedback,
    });
  } catch (error) {
    await logError({ userId, description: String(error), origin: "logSearch" });
  }
}

async function logError({
  userId,
  description,
  origin,
}: {
  userId: number;
  description: string;
  origin: string;
}) {
  const queryClient = postgres(
    `postgres://postgres:${process.env.DB_PASSWORD ?? ""}@0.0.0.0:5432/KnowX`
  );
  const db = drizzle(queryClient);

  await db.insert(error_log).values({
    idUser: userId,
    description,
    errorTime: new Date(),
    origin,
  });
}
