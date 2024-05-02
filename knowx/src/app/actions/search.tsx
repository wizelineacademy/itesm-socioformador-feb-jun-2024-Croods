"use server";
import { getUserId, logSearch } from "../api/schema";
import { cookies } from "next/headers";
import { SEARCH_VALUES_KEY } from "../const/cookies";
import { getSearchObjects, setCookie } from "../helper/cookies";

export async function toggleSearchObject(obj: string) {
  const searchObjects = getSearchObjects();
  let newFavorites: string[] = [];
  if (searchObjects.includes(obj)) {
    newFavorites = searchObjects.filter((object) => object !== obj);
  } else {
    newFavorites = [...searchObjects, obj];
  }
  setCookie(SEARCH_VALUES_KEY, newFavorites.join(","));
}

export async function getSearchObjectsAction() {
  return getSearchObjects();
}

export async function initialSearch(query: string) {
  const topic = query;
  console.log(`topic=${topic}`);
  const u = new URLSearchParams({ topic: topic });
  // const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/initial`, {
  //   method: "POST",
  //   body: u,
  // });
  // console.log(`huh???? =${await res.json()}`);
  // const data = (await res.json()) as string[];

  // return { data };
  return ["Netflix", "Hulu", "Disney+"];
}

export async function getUserIdFunc(
  user: string | null | undefined,
  query: string
) {
  // const { session, query } = await request.json();
  getUserId({ newEmail: user || "" }).then(async (id) => {
    await logSearch({ userId: id, search: query, feedback: false });
  });
}
