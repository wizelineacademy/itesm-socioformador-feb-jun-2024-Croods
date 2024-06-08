// "use client";
import { toggleCategory } from "@/actions/search"
import { getCategories } from "@/helper/cookies"
import P2_NewCategory from "@/components/Phase2/P2_NewCategory"
import { checkSession } from "@/actions/redirect"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import { P2_CategoryResults } from "@/components/Phase2/P2_CategoryResults"

export default async function Features() {
  if (!(await checkSession())) {
    redirect("/auth")
  }
  const { categories, allObjects } = getCategories()

  // const { resolvedTheme } = useTheme();

  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark">
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
    </main>
  )
}
