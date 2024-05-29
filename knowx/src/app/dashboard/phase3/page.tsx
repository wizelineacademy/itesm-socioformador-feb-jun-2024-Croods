"use client"

// the path is http://localhost:3000/dashboard/phase3

import Image from "next/image"
import { useState } from "react"
import { useTheme } from "next-themes"
import Header from "../../components/Header"
import P3_ResultsTable from "@/app/components/Phase3/P3_ResultsTable"
import { Services, Results } from "@/app/interfaces/Phase3"
import { example } from "./ejemplo"
import { getFinalSearch } from "@/app/actions/search"

import jsonObject from "./ejemplo.json"

const results = jsonObject.finalAnswer as Services

export default function Phase3() {
  // const { resolvedTheme } = useTheme()
  const [query, setQuery] = useState("")
  const [selectedSoftwareList, setSelectedSoftwareList] = useState<string[]>([])

  const serviceNames = Object.keys(results)
  const featureNames: string[] = []

  getFinalSearch()

  serviceNames.slice(0, 1).forEach((serviceName) => {
    const serviceInfo = results[serviceName]
    let featuresFound = 0

    Object.entries(serviceInfo).forEach(([featureName, featureValue]) => {
      if (featureName !== "Description" && featuresFound < 2) {
        featureNames.push(featureName)
        featuresFound++
      }
    })
  })

  const handleRowClick = (serviceName: string) => {
    setSelectedSoftwareList((prevList) =>
      prevList.includes(serviceName)
        ? prevList.filter((name) => name !== serviceName)
        : [...prevList, serviceName],
    )
  }

  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark">
      <Header isDashboard={false} title="Results">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-center">
            <input
              name=""
              className="text-md h-10 w-3/4 rounded-2xl bg-black py-4 text-center text-white shadow-lg dark:bg-white dark:text-black"
              onChange={(e) => setQuery(e.target.value)}
              value="Enter your new search here..."
            />
            <button className="px-4 text-4xl text-black dark:text-white">
              <Image
                className="relative left-0 right-0 top-0 text-black"
                src="/arrow-right.svg"
                alt="Search Arrow Right"
                width={25}
                height={20}
                priority
              />
            </button>
          </div>

          <P3_ResultsTable results={example as Results}></P3_ResultsTable>

          <div className="flex h-full w-full flex-col items-center justify-center text-black dark:text-white">
            <div className="no-scrollbar mt-5 flex h-[25rem] w-4/5 overflow-hidden overflow-y-scroll rounded-3xl border-2 border-4 border-black border-white shadow-xl">
              <table className="w-full table-auto bg-white shadow-md dark:bg-black">
                <thead className="sticky top-0 border-b-2 border-black bg-white dark:border-white dark:bg-black">
                  <tr>
                    <th className="px-8 py-4">Tool Name</th>
                    <th className="px-8 py-4">{featureNames[0]}</th>
                    <th className="px-8 py-4">{featureNames[1]}</th>
                  </tr>
                </thead>

                <tbody className="">
                  {serviceNames.map((serviceName, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(serviceName)}
                      className={`cursor-pointer ${
                        selectedSoftwareList.includes(serviceName)
                          ? "bg-backgroundLight bg-opacity-30"
                          : ""
                      } border-b-2 border-black text-center dark:border-white`}
                    >
                      <td className="px-8 py-4">{serviceName}</td>
                      <td className="px-8 py-4">
                        {results[serviceName][featureNames[0]]}
                      </td>
                      <td className="px-8 py-4">
                        {results[serviceName][featureNames[1]]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="m-8 rounded-3xl border-2 border-black bg-black px-8 py-2 text-white shadow-lg hover:bg-neutral-800">
              Compare
            </button>
          </div>
        </div>
      </Header>
    </div>
  )
}
