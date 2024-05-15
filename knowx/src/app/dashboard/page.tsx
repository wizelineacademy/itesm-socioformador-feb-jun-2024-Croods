/* src/app/dashboard/page.tsx */
// "use client";
import Image from "next/image";
import UserMenu from "../components/UserMenu";
import { checkSession } from "@/app/actions/redirect";
import InputBar from "@/app/components/Dashboard/InputBar";
import CheckTheme from "@/app/actions/theme";
import { navigate } from "@/app/actions/redirect";
import { logSearch, getUserId } from "../../../db/dbActions";

export default async function Home() {
  // const { data: session } = useSession();
  checkSession();
  // const theme = await CheckTheme();
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
        <header className="fixed top-0 left-0 right-0 py-3 flex justify-center">
          <Image
            className="relative top-0 left-0 right-0"
            src={"light" !== "light" ? "/Logo.svg" : "/LogoDark.svg"}
            alt="KnowX Logo"
            width={50}
            height={50}
            priority
          />
          <UserMenu className="absolute right-0 mr-3" />
        </header>
        <InputBar></InputBar>
      </div>
    </main>
  );
}
