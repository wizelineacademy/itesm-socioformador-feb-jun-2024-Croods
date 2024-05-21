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
} from "../const/cookies";
import { getSearchObjects, getCategories, setCookie } from "../helper/cookies";
import { getServerSession } from "next-auth";

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
  const u = new URLSearchParams({ topic: topic });
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/initial`, {
    method: "POST",
    body: u,
  });

  const data: string[] = await res.json();

  setCookie(CURRENT_QUERY_KEY, data.join(","));
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

export async function getUserIdFunc(
  user: string | null | undefined,
  query: string
) {
  getUserId({ newEmail: user || "" }).then(async (id) => {
    await logSearch({ old_userId: id, search: query, feedback: false });
  });
}
