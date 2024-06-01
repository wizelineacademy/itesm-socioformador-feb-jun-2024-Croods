"use server"
import { cookies } from "next/headers"
import { getCompares, setCookie } from "../helper/cookies"
import { COMPARES_KEY, COMPARE_DATA_KEY } from "../const/cookies"
import { Results } from "../interfaces/Phase3"

export async function toggleCompares(keys: Set<string>, results: Results) {
  // const compares = getCompares();
  console.log("going")
  let newCompares = ""
  keys.forEach((key) => (newCompares += key + ","))
  // console.log(newCompares);
  setCookie(COMPARES_KEY, newCompares)
  // setCookie(COMPARE_DATA_KEY, JSON.parse(results));
}

// export async function getCompareData

export async function getTitles(results: Results): Promise<string[]> {
  const titles: string[] = []
  results.results.map((service) => {
    titles.push(service.Name)
  })
  return titles
}
