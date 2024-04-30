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