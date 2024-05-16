"use server";
import { getUserId, logSearch } from "../../../db/dbActions";
import { cookies } from "next/headers";
import {
  ORIGINAL_SEARCH_VALUES_KEY,
  SEARCH_VALUES_KEY,
  CURRENT_QUERY_KEY,
  ORIGINAL_CATEGORIES_KEY,
  CATEGORIES_KEY,
} from "../const/cookies";
import { getSearchObjects, getCategories, setCookie } from "../helper/cookies";
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
export async function toggleCategory(obj: string) {
  const { categories } = getCategories();
  let newFavorites: string[] = [];
  if (categories.includes(obj)) {
    newFavorites = categories.filter((object) => object !== obj);
  } else {
    newFavorites = [...categories, obj];
  }
  setCookie(CATEGORIES_KEY, newFavorites.join(","));
}
export async function addCategory(obj: string) {
  const { categories } = getCategories();
  let newFavorites: string[] = [];
  if (categories.includes(obj)) {
    newFavorites = categories.filter((object) => object !== obj);
  } else {
    newFavorites = [...categories, obj];
  }
  setCookie(ORIGINAL_CATEGORIES_KEY, newFavorites.join(","));
}

export async function getSearchObjectsAction() {
  return getSearchObjects();
}

export async function initialSearchAction(query: string) {
  const topic = query;
  console.log(`topic=${topic}`);
  // navigate(`dashboard/phase1/${query}`);

  const u = new URLSearchParams({ topic: topic });
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/initial`, {
    method: "POST",
    body: u,
  });
  console.log(`huh???? =${res}`);
  const data: string[] = await res.json();
  console.log(`data=${data}`);

  setCookie(CURRENT_QUERY_KEY, data.join(","));
  setCookie(ORIGINAL_SEARCH_VALUES_KEY, data.join(","));
  return data;
}
export async function categorySearchFunction(query: string) {
  const topic = query;
  console.log(`topic=${topic}`);
  // navigate(`dashboard/phase1/${query}`);

  const u = new URLSearchParams({ topic: topic });
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/categories`, {
    method: "POST",
    body: u,
  });
  console.log(`huh???? =${res}`);
  const data: string = await res.json();
  console.log(`data=${data}`);

  setCookie(ORIGINAL_CATEGORIES_KEY, data);
  return data;
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
