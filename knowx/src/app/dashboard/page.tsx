/* src/app/dashboard/page.tsx */
// "use client";
import Image from "next/image";
import UserMenu from "../components/UserMenu";
import { checkSession } from "@/app/actions/redirect";
import InputBar from "@/app/components/Dashboard/InputBar";
import { redirect } from "next/navigation";

export default async function Home() {
  // const { data: session } = useSession();
  if (!(await checkSession())) {
    redirect("/auth");
  }

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
