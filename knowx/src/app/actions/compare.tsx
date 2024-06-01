"use server"
import { setCookie } from "../helper/cookies"
import { COMPARES_KEY } from "../const/cookies"
import { Results } from "../interfaces/Phase3"

export async function toggleCompares(keys: Set<string>) {
  let newCompares = ""
  keys.forEach((key) => (newCompares += key + ","))
  setCookie(COMPARES_KEY, newCompares)
}

// export async function getCompareData

export async function getTitles(results: Results): Promise<string[]> {
  const titles: string[] = []
  results.results.map((service) => {
    titles.push(service.Name)
  })
  return titles
}
