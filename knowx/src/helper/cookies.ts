// "use server";
import { cookies } from "next/headers"
import {
  SEARCH_VALUES_KEY,
  ORIGINAL_SEARCH_VALUES_KEY,
  CATEGORIES_KEY,
  ORIGINAL_CATEGORIES_KEY,
  COMPARES_KEY,
  COMPARE_DATA_KEY,
  CURRENT_QUERY_KEY,
} from "@/const/cookies"
import { Results } from "@/interfaces/Phase3"

export function setCookie(key: string, value: string) {
  const cookieStore = cookies()
  cookieStore.set(key, value, {
    path: "/",
    secure: true,
    sameSite: true,
    httpOnly: true,
  })
}

export function getCookie(key: string) {
  return cookies().get(key)?.value
}

export function searchAllObjects() {
  console.log("SEARCHING ALL OBJECTS")
  setCookie(
    SEARCH_VALUES_KEY,
    cookies().get(ORIGINAL_SEARCH_VALUES_KEY)?.value || "",
  )
}

export function initialSearch(query: string) {
  const topic = query
  console.log(`topic=${topic}`)
  // const u = new URLSearchParams({ topic: topic });
  // const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/initial`, {
  //   method: "POST",
  //   body: u,
  // });
  // console.log(`huh???? =${await res.json()}`);
  // const data = (await res.json()) as string[];

  // return { data };
  const res = ["Netflix", "Hulu", "Disney+"]
  // storeOriginalObjects(res);
  // setCookie(ORIGINAL_SEARCH_VALUES_KEY, res.join(","));
  return res
}

export function storeOriginalObjects(objects: string[]) {
  setCookie(ORIGINAL_SEARCH_VALUES_KEY, objects.join(","))
}

export function getSearchObjects() {
  const searchObjects = cookies().get(SEARCH_VALUES_KEY)?.value
  return {
    searchObjects: searchObjects ? searchObjects.split(",") : [],
    allObjects:
      cookies().get(ORIGINAL_SEARCH_VALUES_KEY)?.value.split(",") || [],
  }
}
export function getCurrentQuery() {
  return cookies().get(CURRENT_QUERY_KEY)?.value
}
export function getCategories() {
  const categories = cookies().get(CATEGORIES_KEY)?.value

  return {
    categories: categories ? categories.split(",") : [],
    allObjects: cookies().get(ORIGINAL_CATEGORIES_KEY)?.value.split(",") || [],
  }
}

export function getAllData(): Results {
  // console.log(cookies().get(COMPARE_DATA_KEY)?.value || "{}")
  return JSON.parse(cookies().get(COMPARE_DATA_KEY)?.value || "{}") as Results
}

export function getCompares() {
  const compares = cookies().get(COMPARES_KEY)?.value
  return compares
}

export function loadResultsCookie(data: string) {
  setCookie(COMPARE_DATA_KEY, data)
}