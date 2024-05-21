"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import UserMenu from "@/app/components/UserMenu";
import { Menu } from "@headlessui/react";

interface CardData {
  title: string;
  description: string;
  [key: string]: string;
}

const Card = ({ title, description, data, titles }: { title: string, description: string, data: { [key: string]: string }, titles: string[] }) => (
  <div className="overflow-y-scroll bg-white dark:bg-gray-800 rounded-lg shadow-md p-10 max-w-sm ">
    <Menu as="div" className="relative inline-block text-left w-full">
      <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </Menu.Button>
      <Menu.Items className="origin-top-center absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        {titles.map((title, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? 'bg-gray-100' : ''
                } block px-4 py-2 text-sm text-gray-700`}
              >
                {title}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
    <hr className="h-px my-8 bg-gray-200 border-2 dark:bg-gray-700" />
    <p className="text-center mb-4">{description}</p>
    <ul className="space-y-3">
      {Object.entries(data).map(([key, value], index) => (
        key !== 'Description' && (
          <li key={index} className="flex items-center">
            <span className="block w-5 h-5 bg-gray-600 rounded-full mr-3"></span> {`${key}: ${value}`}
          </li>
        )
      ))}
    </ul>
  </div>
);

export default function Features() {
  const { resolvedTheme } = useTheme();
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.json');
      const data = await response.json();
      const selectedSoftware = data.selectedSoftware;
      const selectedtedData = Object.keys(data.finalAnswer) //returns an array of a given object's own enumerable property names. This suggests that data.finalAnswer is an object, and we want to create an array that contains all of its keys.
        .filter(key => selectedSoftware.includes(key))
        .map(key => ({
          title: key,
          description: data.finalAnswer[key].Description,
          ...data.finalAnswer[key],
        }));

      const titles = Object.keys(data.finalAnswer);
      setCardData(selectedtedData);
      setTitles(titles);
    };

    fetchData();
  }, []);

  return (
    <main className="flex bg-backgroundLight dark:bg-backgroundDark">
      <UserMenu className="absolute right-0 mr-3" />
      <div className="mx-auto px-6 max-w-6xl h-full text-gray-600 flex content-center justify-start flex-col">
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

        <div className="w-full grid grid-cols-3 justify-around gap-10">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              data={Object.fromEntries(Object.entries(card).filter(([key]) => key !== 'title' && key !== 'description'))}
              titles={titles}
            />
          ))}
        </div>
      </div>
    </main>
  );
}