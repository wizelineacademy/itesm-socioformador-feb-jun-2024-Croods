"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { categorySearchFunction } from "./search";

export async function checkSession(): Promise<boolean> {
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

export async function navigateToHistory() {
  redirect("/history");
}

export async function navigateToPhase3() {
  redirect("/dashboard/phase3");

export async function navigateToHistoryLog(logId: string) {
  redirect(`/history/${logId}`);
}
