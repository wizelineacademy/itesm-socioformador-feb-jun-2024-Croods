import { cookies } from "next/headers";
import { SEARCH_VALUES_KEY } from "@/app/const/cookies";

export function setCookie(key: string, value: string) {
  const cookieStore = cookies();
  cookieStore.set(key, value, {
    // expires: Date.now()
    path: "/",
    secure: true,
    sameSite: true,
    httpOnly: true,
  });
}

export function getSearchObjects() {
  const searchObjects = cookies().get(SEARCH_VALUES_KEY)?.value;
  return searchObjects ? searchObjects.split(",") : [];
}
