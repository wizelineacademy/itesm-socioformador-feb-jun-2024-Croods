"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import UserMenu from "@/app/components/UserMenu";

const Card = ({ title, description, value1, value2, value3, value4 }: {title: string, description: string, value1: string, value2: string, value3: string, value4: string}) => (
  <div className=" overflow-y-scroll bg-white dark:bg-gray-800 rounded-lg shadow-md p-10 max-w-sm ">
    <h2 className="text-center text-2xl font-semibold mb-4">{title}</h2>
    <hr className="h-px my-8 bg-gray-200 border-2 dark:bg-gray-700" />
    <p className="text-center mb-4">{description}</p>
    <ul className="space-y-3">
      <li className="flex items-center">
      <span className="block w-5 h-5 bg-gray-600 rounded-full mr-3"></span> {value1}
      </li>
      <li className="flex items-center">
      <span className="block w-5 h-5 bg-gray-600 rounded-full mr-3"></span> {value2}
      </li>
      <li className="flex items-center">
      <span className="block w-5 h-5 bg-gray-600 rounded-full mr-3"></span> {value3}
      </li>
      <li className="flex items-center">
      <span className="block w-5 h-5 bg-gray-600 rounded-full mr-3"></span> {value4}
      </li>
    </ul>
  </div>
);

export default function Features() {
  const { resolvedTheme } = useTheme();

  const cardData = [
    {
      title: "Example 01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel dui ornare, tristique massa a, euismod quam. Integer tempus quis ligula vitae fringilla. Ut tempor sed nisi ullamcorper finibus.",
        value1: "1", 
        value2: "2",
        value3: "3", 
        value4: "4"
    },
    {
      title: "Example 02",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel dui ornare, tristique massa a, euismod quam. Integer tempus quis ligula vitae fringilla. Ut tempor sed nisi ullamcorper finibus.",
        value1: "1", 
        value2: "2",
        value3: "3", 
        value4: "4"
    }
  ];

  return (
    <main className="flex bg-backgroundLight dark:bg-backgroundDark">
      <UserMenu className="absolute right-0 mr-3" />
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-start flex-col">
        <section className="relative top-0 left-0 right-0 py-3 flex justify-center">
          <Image
            className="relative top-0 left-0 right-0"
            src={resolvedTheme === "light" ? "/LogoDark.svg" : "/Logo.svg"}
            alt="KnowX Logo"
            width={50}
            height={50}
            priority
          />
        </section>

        <div className="w-full relative p-14 snap-start">
          <h1 className="text-5xl text-center text-black dark:text-white">
            Compare Results
          </h1>
        </div>

        <div className="w-full flex justify-around gap-x-10">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              value1={card.value1}
              value2={card.value2}
              value3={card.value3}
              value4={card.value4}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
