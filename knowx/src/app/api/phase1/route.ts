import { getUserId, logSearch } from "@/db/insertActions"

export async function POST(request: Request) {
  const { topic } = await request.json()
  console.log(`topic=${topic}`)
  const u = new URLSearchParams({ topic: topic })
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/initial`, {
    method: "POST",
    body: u,
  })
  const data = (await res.json()) as string[]

  return Response.json({ data })
}

export async function PUT(request: Request) {
  const { session, query } = await request.json()
  getUserId({ newEmail: session?.user?.email || "" }).then(async (id) => {
    await logSearch({ userId: id, search: query })
  })
}
