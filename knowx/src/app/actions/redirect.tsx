"use server";
// "use client";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export async function checkSession(): Promise<boolean> {
  // const { data: session } = useSession();
  // if (!session) {
  //   redirect("/auth");
  //   return false;
  // }
  // return true;
  const session = await getServerSession();
  if (!session) {
    redirect("/auth");
    return false;
  }
  return true;
}

// export async function startPhase1(query: string) {
//   redirect(query);
// }

export async function navigate(query: string) {
  redirect(`/dashboard/phase1/${query}`);
}
