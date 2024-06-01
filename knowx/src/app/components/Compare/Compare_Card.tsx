"use client"

import React from "react"
import { Menu } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { Results, ServiceCategories } from "@/app/interfaces/Phase3"

interface CardData {
  title: string
  description: string
  [key: string]: string
}

interface CardProps {
  initialTitle: string
  initialDescription: string
  initialData: ServiceCategories[]
  titles: string[]
  allData: Results
}

export const Compare_Card = ({
  initialTitle,
  initialDescription,
  initialData,
  titles,
  allData,
}: CardProps) => {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [data, setData] = useState(initialData)

  const handleSelectTitle = (selectedTitle: string) => {
    const selectedData = allData.results.find(
      (service) => service.Name === selectedTitle,
    )
    setTitle(selectedTitle)
    setDescription(selectedData?.Description || "undefined")
    setData(selectedData?.Categories || [])
  }

  return (
    <div className="h-[70vh] w-96 flex-shrink-0 overflow-y-scroll rounded-3xl border-2 border-black bg-white p-10 shadow-xl dark:bg-gray-800">
      <Menu as="div" className="relative inline-block w-full text-left">
        <Menu.Button className=" inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          <h2 className="text-2xl font-semibold text-black">{title}</h2>
          <ChevronDownIcon
            className="ml-auto mt-1 h-7 w-7"
            aria-hidden="true"
          />
        </Menu.Button>
        <Menu.Items className="origin-top-center absolute left-1/2 mt-2 w-56 -translate-x-1/2 transform rounded-md bg-white shadow-lg ">
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
      <hr className="my-8 h-px border-2 bg-gray-600 dark:bg-gray-700" />
      <p className="mb-8 text-center text-black">{description}</p>
      <ul className="space-y-3 text-black">
        {data.map(
          (category, index) =>
            category.Name !== "Description" &&
            category.Name !== "title" && (
              <li key={index} className="flex items-center">
                <span className="mr-3 block h-3 w-3 rounded-full bg-black"></span>{" "}
                {`${category.Name}: ${category.Value}`}
              </li>
            ),
        )}
      </ul>
    </div>
  )
}
