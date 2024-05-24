"use server";
import { deleteSearchLog } from "../../../db/deleteActions";
import { logBadSearch, logGoodSearch } from "../../../db/updateActions";

export async function deleteSearchLogAction(logId: number) {
  return await deleteSearchLog({ logId });
}

export async function logGoodSearchAction(logId: number) {
  return await logGoodSearch({ logId });
}

export async function logBadSearchAction(logId: number) {
  return await logBadSearch({ logId });
}
