"use server"
import { deleteSearchLog } from "../../../db/deleteActions"
import { logBadSearch, logGoodSearch } from "../../../db/updateActions"
import { getServerSession } from "next-auth"

export async function deleteSearchLogAction(logId: number) {
  return await deleteSearchLog({ logId })
}

export async function logGoodSearchAction(logId: number) {
  const session = await getServerSession()
  return await logGoodSearch({ email: session?.user?.email || "", logId })
}

export async function logBadSearchAction(logId: number) {
  const session = await getServerSession()
  return await logBadSearch({ email: session?.user?.email || "", logId })
}
