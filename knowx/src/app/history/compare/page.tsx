import { Compare_Card } from "@/app/components/Compare/Compare_Card"
import Header from "@/app/components/Header"
import { getTitles } from "@/app/actions/compare"
import { Results } from "@/app/interfaces/Phase3"
import { getAllData, getCompares } from "@/app/helper/cookies"
import { Compare_Button } from "@/app/components/Compare/Compare_Button"

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

        <Compare_Button isHistory={true} />
      </Header>
    </main>
  )
}
