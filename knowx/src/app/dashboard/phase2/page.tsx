// "use client";
import { toggleCategory } from "@/app/actions/search";
import { getCategories } from "@/app/helper/cookies";
import P2_NewCategory from "@/app/components/Phase2/P2_NewCategory";
import { checkSession } from "@/app/actions/redirect";
import { redirect } from "next/navigation";
import Header from "@/app/components/Header";
import { P2_CategoryResults } from "@/app/components/Phase2/P2_CategoryResults";

export default async function Features() {
  if (!(await checkSession())) {
    redirect("/auth");
  }
  const { categories, allObjects } = getCategories();

  // const { resolvedTheme } = useTheme();

  return (
    <main className="flex bg-backgroundLight dark:bg-backgroundDark">
      {/* <UserMenu className="absolute right-0 mr-3" /> */}
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center items-center justify-center">
        {/* <section className="relative top-0 left-0 right-0 py-3 flex justify-center">
      <UserMenu className="absolute right-0 mr-3" />
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center items-center justify-start align-center flex-col">
        <section className="relative top-0 left-0 right-0 py-3 flex justify-center">
          <Image
            className="relative top-0 left-0 right-0"
            src={"light" === "light" ? "/Logo.svg" : "/LogoDark.svg"}
            alt="KnowX Logo"
            width={50}
            height={50}
            priority
          />
        </section> */}

        <Header isDashboard={true} title="Select your Favorites" />

        {/*
        <div className="relative w-full snap-start p-14">
          <h1 className="text-center text-5xl text-black dark:text-white">
            Select your Favorites
          </h1>
        </div> */}

        <div className="overflow-y-scroll h-[20rem] items-center content-center justify-center p-3 pretty-scrollbar">
          <ul className="grid grid-cols-2 flex-wrap gap-8">
            {allObjects.map((feature, index) => (
              <P2_CategoryResults
                key={index}
                index={index}
                isSelected={categories.includes(feature)}
                feature={feature}
                toggleCategory={toggleCategory}
              />
            ))}
          </ul>
        </div>
        <P2_NewCategory></P2_NewCategory>
      </div>
    </main>
  );
}
