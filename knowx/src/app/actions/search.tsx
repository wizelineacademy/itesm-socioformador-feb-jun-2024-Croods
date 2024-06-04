"use server"
import { getUserId, logSearch } from "../../../db/insertActions"

import {
  logGeneratedTopics,
  logSelectedTopics,
  logGeneratedCategories,
  logSelectedCategories,
  logAddedCategories,
  logSearchResults,
} from "../../../db/updateActions"

import {
  ORIGINAL_SEARCH_VALUES_KEY,
  SEARCH_VALUES_KEY,
  CURRENT_QUERY_KEY,
  ORIGINAL_CATEGORIES_KEY,
  ADDED_CATEGORIES_KEY,
  CATEGORIES_KEY,
  COMPARE_DATA_KEY,
  COMPARES_KEY,
  CURRENT_SEARCH_ID_KEY,
} from "../const/cookies"

import {
  getSearchObjects,
  getCategories,
  setCookie,
  getCookie,
  getCurrentQuery,
} from "../helper/cookies"
import { getServerSession } from "next-auth"
import { Results } from "../interfaces/Phase3"

export async function toggleSearchObject(obj: string) {
  const { searchObjects } = getSearchObjects()
  let newFavorites: string[] = []
  if (searchObjects.includes(obj)) {
    newFavorites = searchObjects.filter((object) => object !== obj)
  } else {
    newFavorites = [...searchObjects, obj]
  }
  setCookie(SEARCH_VALUES_KEY, newFavorites.join(","))
}
export async function toggleCategory(obj: string) {
  const { categories } = getCategories()
  let newFavorites: string[] = []

  if (categories.includes(obj)) {
    newFavorites = categories.filter((object) => object !== obj)
  } else {
    newFavorites = [...categories, obj]
  }

  setCookie(CATEGORIES_KEY, newFavorites.join(","))
}
export async function addCategory({
  obj,
  isAdded = false,
}: {
  obj: string
  isAdded?: boolean
}) {
  const { allObjects } = getCategories()
  let newFavorites: string[] = []

  if (allObjects.includes(obj)) {
    newFavorites = allObjects.filter((object) => object !== obj)
  } else {
    newFavorites = [...allObjects, obj]
  }

  setCookie(ORIGINAL_CATEGORIES_KEY, newFavorites.join(","))

  if (isAdded) {
    const addedCategories = getCookie(ADDED_CATEGORIES_KEY)?.split(",") || []

    let newAdded: string[] = []

    if (addedCategories.includes(obj)) {
      newAdded = addedCategories.filter((object) => object !== obj)
    } else {
      newAdded = [...addedCategories, obj]
    }

    setCookie(ADDED_CATEGORIES_KEY, newAdded.join(","))
  }
}

export async function getSearchObjectsAction() {
  return getSearchObjects()
}

export async function clearSearches() {
  setCookie(SEARCH_VALUES_KEY, "")
  setCookie(ORIGINAL_SEARCH_VALUES_KEY, "")
  setCookie(CURRENT_QUERY_KEY, "")
  setCookie(CATEGORIES_KEY, "")
  setCookie(ORIGINAL_CATEGORIES_KEY, "")
  setCookie(COMPARE_DATA_KEY, "")
  setCookie(COMPARES_KEY, "")
  setCookie(CURRENT_SEARCH_ID_KEY, "")
  setCookie(ADDED_CATEGORIES_KEY, "")
}

export async function initialSearchAction(query: string) {
  const topic = query
  const u = new URLSearchParams({ topic: topic })
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/initial`, {
    method: "POST",
    body: u,
  })

  const data: string[] = await res.json()

  setCookie(CURRENT_QUERY_KEY, query)
  setCookie(ORIGINAL_SEARCH_VALUES_KEY, data.join(","))

  const session = await getServerSession()
  const id = await getUserId({ newEmail: session?.user?.email || "" })
  const searchId = await logSearch({ userId: id, search: query })

  if (searchId) {
    setCookie(CURRENT_SEARCH_ID_KEY, searchId[0].id.toString() ?? "")

    logGeneratedTopics({
      userId: id,
      searchId: searchId[0].id,
      generatedTopics: data.join(", "),
    })
  }

  return data
}

export async function categorySearchFunction(query: string) {
  const topic = query
  const u = new URLSearchParams({ topic: topic })
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/categories`, {
    method: "POST",
    body: u,
  })
  const data: string = await res.json()

  setCookie(ORIGINAL_CATEGORIES_KEY, data)

  const { searchObjects, allObjects } = getSearchObjects()

  const session = await getServerSession()
  const userId = await getUserId({ newEmail: session?.user?.email || "" })

  await logSelectedTopics({
    userId: userId,
    searchId: parseInt(getCookie(CURRENT_SEARCH_ID_KEY) || ""),
    selectedTopics:
      searchObjects.length === 0
        ? allObjects.join(", ")
        : searchObjects.join(", "),
  })

  await logGeneratedCategories({
    userId: userId,
    searchId: parseInt(getCookie(CURRENT_SEARCH_ID_KEY) || ""),
    generatedCategories: data,
  })

  return data
}

// export async function setFullSearch() {
//   setCookie(COMPARE_DATA_KEY, JSON.stringify(example));
//   return example;
// }
export async function getFullSearch() {
  const MAX_TRYS = 5
  let trys = 0
  let data: Results[] = []

  const session = await getServerSession()
  const userId = await getUserId({ newEmail: session?.user?.email || "" })

  // Log selected categories
  const { categories, allObjects } = getCategories() || {
    categories: [],
    allObjects: [],
  }
  const addedCategories = getCookie(ADDED_CATEGORIES_KEY)?.split(",") || []

  if (categories.length === 0) {
    categories.push(...allObjects)
  }

  const filteredCategories = categories.filter(
    (object) => !addedCategories.includes(object),
  )

  logSelectedCategories({
    userId: userId,
    searchId: parseInt(getCookie(CURRENT_SEARCH_ID_KEY) || ""),
    selectedCategories: filteredCategories.join(", "),
  })

  // Log added categories
  const finalAddedCategories = addedCategories.filter(
    (object) => allObjects.includes(object) && categories.includes(object),
  )

  logAddedCategories({
    userId: userId,
    searchId: parseInt(getCookie(CURRENT_SEARCH_ID_KEY) || ""),
    addedCategories: finalAddedCategories.join(", "),
  })

  // const categories = getCategories().categories || []
  const searchObjects = getSearchObjects().searchObjects
  const currentQuery = getCurrentQuery()

  const u = new URLSearchParams()

  categories.forEach((category) => u.append("categories", category))
  searchObjects.forEach((tool) => u.append("tools", tool))

  if (currentQuery) {
    u.append("topic", currentQuery)
  }

  while (trys < MAX_TRYS && data.length === 0) {
    const res = await fetch(`${process.env.API_ROOT_ROUTE}/search`, {
      method: "POST",
      body: u,
    })

    const regex = /\{.*\}/
    const matched = regex.exec(await res.text())

    if (matched) {
      try {
        console.log("TRY: ", trys)
        data = JSON.parse(matched[0])
      } catch (e) {
        console.log("FAILED TO PARSE JSON: ", e)
        data = []
      }
    } else {
      data = []
    }

    trys++
  }

  setCookie(COMPARE_DATA_KEY, JSON.stringify(data))

  logSearchResults({
    userId: userId,
    searchId: parseInt(getCookie(CURRENT_SEARCH_ID_KEY) || ""),
    searchResults: JSON.stringify(data),
  })
}

export async function getUserIdFunc(
  user: string | null | undefined,
  query: string,
) {
  getUserId({ newEmail: user || "" }).then(async (id) => {
    await logSearch({ userId: id, search: query })
  })
}

export async function loadResultsCookie(data: string) {
  setCookie(COMPARE_DATA_KEY, data)
}
