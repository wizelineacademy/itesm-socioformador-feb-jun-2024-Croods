//src/components/compare/page.tsx
import { Compare_Card } from "@/components/Compare/Compare_Card"
import Header from "@/components/Header"
import { getTitles } from "@/actions/compare"
import { Results } from "@/interfaces/Phase3"
import { getAllData, getCompares } from "@/helper/cookies"
import { Compare_Button } from "@/components/Compare/Compare_Button"

export default async function Compare() {
  const data = getAllData() as Results
  const compares = await getCompares()
  const titles = await getTitles(data)

  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark">
      <Header isDashboard={true} title="Compare">
        <div className="flex w-full space-x-10 overflow-x-auto px-10">
          {data.results
            .filter((service) => compares?.includes(service.Name))
            .map((item, index) => (
              <Compare_Card
                key={index}
                initialTitle={item.Name}
                initialDescription={item.Description}
                initialData={item.Categories}
                titles={titles}
                allData={data}
              />
            ))}
        </div>

        <Compare_Button isHistory={false} />
      </Header>
    </main>
  )
}
