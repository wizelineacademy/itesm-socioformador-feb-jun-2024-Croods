export async function POST() {
  const res = await fetch("http://127.0.0.1:8000/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic: "Something" }),
  });
  const data = await res.json();

  return Response.json({ data });
}
