"use client";

import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Results, ServiceCategories } from "@/app/interfaces/Phase3";

interface CardData {
  title: string;
  description: string;
  [key: string]: string;
}

interface CardProps {
  initialTitle: string;
  initialDescription: string;
  initialData: ServiceCategories[];
  titles: string[];
  allData: Results;
}

export const Compare_Card = ({
  initialTitle,
  initialDescription,
  initialData,
  titles,
  allData,
}: CardProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [data, setData] = useState(initialData);

  const handleSelectTitle = (selectedTitle: string) => {
    const selectedData = allData.results.find(
      (service) => service.Name === selectedTitle
    );
    setTitle(selectedTitle);
    setDescription(selectedData?.Description || "undefined");
    setData(selectedData?.Categories || []);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-2 rounded-3xl border-black shadow-xl p-10 w-96 h-[70vh] flex-shrink-0 overflow-y-scroll">
      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button className=" inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          <h2 className="text-2xl font-semibold text-black">{title}</h2>
          <ChevronDownIcon
            className="mt-1 ml-auto h-7 w-7"
            aria-hidden="true"
          />
        </Menu.Button>
        <Menu.Items className="origin-top-center absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ">
          {titles.map((title, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <a
                  href="#"
                  onClick={() => handleSelectTitle(title)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block px-4 py-2 text-sm text-gray-700`}
                >
                  {title}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
      <hr className="h-px my-8 bg-gray-600 border-2 dark:bg-gray-700" />
      <p className="text-center mb-8 text-black">{description}</p>
      <ul className="space-y-3 text-black">
        {data.map(
          (category, index) =>
            category.Name !== "Description" &&
            category.Name !== "title" && (
              <li key={index} className="flex items-center">
                <span className="block w-3 h-3 bg-black rounded-full mr-3"></span>{" "}
                {`${category.Name}: ${category.Value}`}
              </li>
            )
        )}
      </ul>
    </div>
  );
};
