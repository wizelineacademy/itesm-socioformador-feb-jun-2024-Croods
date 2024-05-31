"use server";
import { getUserId, logSearch } from "../../../db/insertActions";
import { logSearchTopics } from "../../../db/updateActions";
import { cookies } from "next/headers";
import {
  ORIGINAL_SEARCH_VALUES_KEY,
  SEARCH_VALUES_KEY,
  CURRENT_QUERY_KEY,
  ORIGINAL_CATEGORIES_KEY,
  CATEGORIES_KEY,
  COMPARE_DATA_KEY,
  COMPARES_KEY,
} from "../const/cookies";
import {
  getSearchObjects,
  getCategories,
  setCookie,
  getCurrentQuery,
} from "../helper/cookies";
import { getServerSession } from "next-auth";
import { example } from "../dashboard/phase3/ejemplo";
import { Results } from "../interfaces/Phase3";

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
  const { allObjects } = getCategories();
  let newFavorites: string[] = [];
  if (allObjects.includes(obj)) {
    newFavorites = allObjects.filter((object) => object !== obj);
  } else {
    newFavorites = [...allObjects, obj];
  }
  setCookie(ORIGINAL_CATEGORIES_KEY, newFavorites.join(","));
}

export async function getSearchObjectsAction() {
  return getSearchObjects();
}

export async function clearSearches() {
  setCookie(SEARCH_VALUES_KEY, "");
  setCookie(ORIGINAL_SEARCH_VALUES_KEY, "");
  setCookie(CURRENT_QUERY_KEY, "");
  setCookie(CATEGORIES_KEY, "");
  setCookie(ORIGINAL_CATEGORIES_KEY, "");
  setCookie(COMPARE_DATA_KEY, "");
  setCookie(COMPARES_KEY, "");

  // export const SEARCH_VALUES_KEY = "searchValues";
  // export const ORIGINAL_SEARCH_VALUES_KEY = "originalSearchValues";
  // export const CATEGORIES_KEY = "categories";
  // export const ORIGINAL_CATEGORIES_KEY = "originalCategories";
  // export const CURRENT_QUERY_KEY = "currentQuery";
  // export const COMPARES_KEY = "compares";
  // export const COMPARE_DATA_KEY = "compareData";
}

export async function initialSearchAction(query: string) {
  const topic = query;
  const u = new URLSearchParams({ topic: topic });
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/initial`, {
    method: "POST",
    body: u,
  });

  const data: string[] = await res.json();

  setCookie(CURRENT_QUERY_KEY, query);
  setCookie(ORIGINAL_SEARCH_VALUES_KEY, data.join(","));

  const session = await getServerSession();

  getUserIdFunc(session?.user?.email, query);

  return data;
}

export async function categorySearchFunction(query: string) {
  const topic = query;
  const u = new URLSearchParams({ topic: topic });
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/categories`, {
    method: "POST",
    body: u,
  });
  const data: string = await res.json();

  setCookie(ORIGINAL_CATEGORIES_KEY, data);

  // Log Selected Topics

  const { searchObjects } = getSearchObjects();

  const processedTopic = topic.replaceAll("%20", " ");

  logSearchTopics({
    search: processedTopic,
    selectedTopics: searchObjects.join(", "),
  });

  return data;
}

// export async function setFullSearch() {
//   setCookie(COMPARE_DATA_KEY, JSON.stringify(example));
//   return example;
// }
export async function getFullSearch() {
  const categories = getCategories().categories || [];
  const searchObjects = getSearchObjects().searchObjects;
  const currentQuery = getCurrentQuery();

  const u = new URLSearchParams();

  categories.forEach((category) => u.append("categories", category));
  searchObjects.forEach((tool) => u.append("tools", tool));

  if (currentQuery) {
    u.append("topic", currentQuery);
  }
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/search`, {
    method: "POST",
    body: u,
  });
  // console.log(await res.json());
  const data: Results = await res.json();

  setCookie(COMPARE_DATA_KEY, JSON.stringify(data));
}

export async function getUserIdFunc(
  user: string | null | undefined,
  query: string
) {
  getUserId({ newEmail: user || "" }).then(async (id) => {
    await logSearch({ userId: id, search: query, feedback: false });
  });
}
