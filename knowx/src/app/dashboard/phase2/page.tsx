// "use client";
import { toggleCategory } from "@/app/actions/search"
import { getCategories } from "@/app/helper/cookies"
import P2_NewCategory from "@/app/components/Phase2/P2_NewCategory"
import { checkSession } from "@/app/actions/redirect"
import { redirect } from "next/navigation"
import Header from "@/app/components/Header"
import { P2_CategoryResults } from "@/app/components/Phase2/P2_CategoryResults"

export default async function Features() {
  if (!(await checkSession())) {
    redirect("/auth")
  }
  const { categories, allObjects } = getCategories()

  // const { resolvedTheme } = useTheme();

  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark">
      {/* <div className="mx-auto flex h-screen max-w-6xl flex-wrap content-center items-center justify-center px-6 text-gray-600"> */}
      <Header isDashboard={true} title="Select your Favorites">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="pretty-scrollbar h-[20rem] content-center items-center justify-center overflow-y-scroll p-3">
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
      </Header>
      {/* </div> */}
    </main>
  )
}
