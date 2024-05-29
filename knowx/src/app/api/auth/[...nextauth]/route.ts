import NextAuth, { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import SlackProvider from "next-auth/providers/slack"
import EmailProvider from "next-auth/providers/email"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { handleLogin } from "../../../../../db/insertActions"
import { db } from "../../../../../db/schema"
import type { Adapter } from "next-auth/adapters"

const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
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
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.SENDGRID_API_KEY,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ profile }) {
      return await handleLogin({ profile })
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
