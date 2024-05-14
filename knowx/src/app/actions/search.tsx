"use server";
import { getUserId, logSearch } from "../../../db/dbActions";
import { cookies } from "next/headers";
import {
  ORIGINAL_SEARCH_VALUES_KEY,
  SEARCH_VALUES_KEY,
} from "../const/cookies";
import {
  getSearchObjects,
  setCookie,
  searchAllObjects,
  storeOriginalObjects,
  initialSearch,
} from "../helper/cookies";
import { navigate } from "./redirect";

export async function toggleSearchObject(obj: string) {
  const { searchObjects } = getSearchObjects();
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

export async function initialSearchAction(query: string) {
  const topic = query;
  console.log(`topic=${topic}`);
  // navigate(`dashboard/phase1/${query}`);

  // const u = new URLSearchParams({ topic: topic });
  // const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/initial`, {
  //   method: "POST",
  //   body: u,
  // });
  // console.log(`huh???? =${res}`);
  // const result = await res.json();
  // const data = (await result) as string[];

  // return { data };
  let resFake = ["Netflix", "Hulu", "Disney+"];
  // storeOriginalObjects(res);
  setCookie(ORIGINAL_SEARCH_VALUES_KEY, resFake.join(","));
  return resFake;
}

export async function getUserIdFunc(
  user: string | null | undefined,
  query: string
) {
  // const { session, query } = await request.json();
  getUserId({ newEmail: user || "" }).then(async (id) => {
    await logSearch({ old_userId: id, search: query, feedback: false });
  });
}
