"use server";
// "use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export async function checkSession(): Promise<boolean> {
  const { data: session } = useSession();
  if (!session) {
    redirect("/auth");
    return false;
  }
  return true;
}

export async function navigate(query: string) {
  redirect(`/dashboard/phase1/${query}`);
}
