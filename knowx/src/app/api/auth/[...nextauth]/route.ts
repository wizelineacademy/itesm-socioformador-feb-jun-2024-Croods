import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import SlackProvider from "next-auth/providers/slack";
import EmailProvider from 'next-auth/providers/email';
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import { handleLogin } from "../../../../../db/dbActions";

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const authOptions: NextAuthOptions = {
  adapter: PostgresAdapter(pool),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID ?? "",
      clientSecret: process.env.SLACK_CLIENT_SECRET ?? "",
    }),
    EmailProvider({
      server: {
        host: 'smtp.sendgrid.net',
        port: 465,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY /*as string*/,
        },
      },
      from: process.env.EMAIL_FROM /*as string*/,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      return session;
    },
    async signIn({ profile }: any) {
      return await handleLogin({ profile });
    },
  },
  session: {
    strategy: "database",
  }
};
