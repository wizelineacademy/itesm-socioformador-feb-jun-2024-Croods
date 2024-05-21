"use server";
// "use client";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { categorySearchFunction } from "./search";

export async function checkSession(): Promise<Boolean> {
  // const { data: session } = useSession();
  // if (!session) {
  //   redirect("/auth");
  //   return false;
  // }
  // return true;
  const session = await getServerSession();
  return session ? true : false;
}

// export async function startPhase1(query: string) {
//   redirect(query);
// }

export async function navigate(query: string) {
  redirect(`/dashboard/phase1/${query}`);
}
export async function navigateToDashboard() {
  redirect("/dashboard");
}
export async function navigateToPhase2(query: string) {
  await categorySearchFunction(query);
  redirect("/dashboard/phase2");
}
export async function navigateToPhase3() {
  return null;
}
