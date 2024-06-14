import { prepareDb } from "../../../../cypress/utils/prepareDB"

export async function GET() {
  await prepareDb()
  return new Response("Database prepared")
}
