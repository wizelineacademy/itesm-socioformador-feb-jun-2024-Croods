import {
  pgTable,
  serial,
  date,
  varchar,
  integer,
  timestamp,
  boolean,
  text,
  primaryKey
} from "drizzle-orm/pg-core";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import type { AdapterAccount } from "next-auth/adapters"

const pool = neon(process.env.DB_URL!);
export const db = drizzle(pool)

export const old_user = pgTable("old_user", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  region: varchar("region", { length: 20 }),
  createdAt: date("createdAt"),
});

export const search_log = pgTable("search_log", {
  id: serial("id").primaryKey(),
  idUser: integer("idUser").references(() => old_user.id),
  search: varchar("search", { length: 128 }),
  timeOfSearch: timestamp("timeOfSearch", { withTimezone: true }),
  feedback: boolean("feedback"),
});

export const login_log = pgTable("login_log", {
  id: serial("id").primaryKey(),
  idUser: integer("userId").references(() => old_user.id),
  accessDate: timestamp("accessDate", { withTimezone: true }),
});

export const error_log = pgTable("error_log", {
  id: serial("id").primaryKey(),
  idUser: integer("userId").references(() => old_user.id),
  description: text("description"),
  errorTime: timestamp("errorTime", { withTimezone: true }),
  origin: varchar("origin", { length: 100 }),
});

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
 
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

export type User = typeof old_user.$inferSelect;
export type SearchLog = typeof search_log.$inferSelect;
export type LoginLog = typeof login_log.$inferSelect;
export type ErrorLog = typeof error_log.$inferSelect;