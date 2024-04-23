export async function POST(request: Request, response: Response) {
  const { topic } = await request.json();
  console.log(`topic=${topic}`);
  const u = new URLSearchParams({ topic: topic });
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/search/initial`, {
    method: "POST",
    body: u,
  });
  // console.log(`huh???? =${await res.json()}`);
  const data = (await res.json()) as string[];

  return Response.json({ data });
  // return Response.json({ data: ["Netflix", "Hulu", "Disney+"] });
}
