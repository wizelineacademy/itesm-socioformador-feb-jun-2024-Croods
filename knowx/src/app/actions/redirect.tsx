"use server";

import { redirect } from "next/navigation";

export async function navigate(query: string) {
  redirect(`/dashboard/phase1/${query}`);
}
