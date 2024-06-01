import { Compare_Card } from "@/app/components/Compare/Compare_Card";
import Header from "@/app/components/Header";
import { getTitles } from "@/app/actions/compare";
import { Results } from "@/app/interfaces/Phase3";
import { getAllData, getCompares } from "@/app/helper/cookies";
import { Compare_Button } from "@/app/components/Compare/Compare_Button";

export default async function Compare() {
  const data = getAllData() as Results;
  const compares = await getCompares();
  const titles = await getTitles(data);

  return (
    <div className="flex  mx-auto px-6 max-w-6xl h-screen text-gray-600 flex-wrap content-center justify-center">
      <section className="z-50">
        <Header isDashboard={true} title="Compare" />
      </section>

      <div className="w-full overflow-x-auto flex space-x-10 mt-24">
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

      <Compare_Button></Compare_Button>
    </div>
  );
}
