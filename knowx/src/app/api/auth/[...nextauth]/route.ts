/* src/app/api/auth/[...nextauth]/route.ts*/
import NextAuth from 'next-auth';

import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import SlackProvider from 'next-auth/providers/slack';
import EmailProvider from 'next-auth/providers/email';

import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
//import pg from "pg";
//const { Pool } = pg;
//import PostgresAdapter from "../../../lib/adapter";
//import Adapter from "@next-auth/prisma-adapter";
//import { PrismaClient } from "@prisma/client";

//const prisma = new PrismaClient();
//http://localhost:3000/auth
//sofia.cantuu@protonmail.com

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

//export const { handlers, auth, signIn, signOut } = NextAuth({
export const authOptions = {
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
    /*
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    */
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
  session: {
    strategy: "database",
  }
};



export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


