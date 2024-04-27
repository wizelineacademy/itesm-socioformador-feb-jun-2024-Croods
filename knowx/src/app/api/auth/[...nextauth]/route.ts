import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import SlackProvider from "next-auth/providers/slack";
import CredentialsProvider from "next-auth/providers/credentials";
import { handleLogin } from "../../../../../db/dbActions";

const authOptions: NextAuthOptions = {
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
    // CredentialsProvider({
    //   name: 'Email',
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   authorize: async (credentials) => {
    //     // Aqui se pone para verificar si el usuario y contraseña son correctos
    //     return null;
    //   }
    // })
  ],
  callbacks: {
    async session({ session }: any) {
      return session;
    },
    async signIn({ profile }: any) {
      return await handleLogin({ profile });
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
