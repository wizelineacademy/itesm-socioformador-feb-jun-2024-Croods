/* src/app/dashboard/page.tsx */
// "use client";
import { checkSession } from "@/app/actions/redirect";
import InputBar from "@/app/components/Dashboard/InputBar";
import { redirect } from "next/navigation";
import Header from "../components/Header";

export default async function Home() {
  // const { data: session } = useSession();
  if (!(await checkSession())) {
    redirect("/auth");
  }

  // const theme = await checkTheme();
  // if (!session) {
  //   redirect("/auth");
  // }

  // const [query, setQuery] = useState<string>("");

  // const callSearchAPI = async (query: string) => {
  //   console.log(query);
  //   const u = new URLSearchParams({ topic: query });
  //   const response = await fetch("http://127.0.0.1:8000/search", {
  //     method: "POST",
  //     body: u,
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark">
      <Header isDashboard={true}>
        <div className="relative flex h-[70%] w-5/6 max-w-6xl items-center justify-center">
          <InputBar></InputBar>
        </div>
      </Header>
    </main>
  );
}
