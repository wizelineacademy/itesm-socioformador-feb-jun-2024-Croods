/* src/app/dashboard/page.tsx */
// "use client";
import Image from "next/image";
import UserMenu from "../components/UserMenu";
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

  let query: string = "";
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
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-center">
        <Header isDashboard={true}></Header>
        <InputBar></InputBar>
      </div>
    </main>
  );
}
