"use server";
import { deleteSearchLog } from "../../../db/deleteActions";

export async function deleteSearchLogAction(logId: number) {
  return await deleteSearchLog({ logId });
}
