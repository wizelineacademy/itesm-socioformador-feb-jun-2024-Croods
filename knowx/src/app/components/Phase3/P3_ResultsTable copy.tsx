"use client"
import React from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table"
import {
  Spinner,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
  ScrollShadow,
} from "@nextui-org/react"

import { useAsyncList } from "@react-stately/data"

import { useState } from "react"

import {
  ResultsTableProps,
  Service,
  Results,
  ServiceCategories,
} from "@/app/interfaces/Phase3"
import { use } from "chai"

export const P3_ResultsTable = ({ results }: ResultsTableProps) => {
  const [category1, setCategory1] = useState<number>(1)
  const [category2, setCategory2] = useState<number>(2)
  const [resultsTable, setResultsTable] = useState<Service[]>(results.results)

  const changeTableResults = (category1r: number, category2r: number) => {
    console.log("CATEGORY 1: ", category1r, " CATEGORY 2: ", category2r)
    const newResults = results.results.map((service: Service) => {
      console.log("SERVICE: ", service)
      const newService = {
        Categories: [
          {
            Name: service.Categories[category1r].Name,
            Value: service.Categories[category1r].Value,
          },
          {
            Name: service.Categories[category2r].Name,
            Value: service.Categories[category2r].Value,
          },
        ] as ServiceCategories[],
      } as Service

      // newService.Categories = [
      //   service.Categories[category1],
      //   service.Categories[category2],
      // ];

      return newService
    })
    setResultsTable(newResults)
    console.log(newResults)
    return newResults
  }

  // useEffect(() => {
  //   console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
  //   results.results.map((service, index) => {
  //     service.Categories = !service.Categories.includes({
  //       Name: "Name",
  //       Value: service.Name,
  //     })
  //       ? [{ Name: "Name", Value: service.Name }, ...service.Categories]
  //       : service.Categories;
  //   });
  // }, []);

  const list = useAsyncList({
    async load({ signal }) {
      return {
        items: results.results,
      }
    },
    async sort({ items, sortDescriptor }) {
      items = items as Service[]
      console.log(results.results)
      return {
        items: results.results,
        // items: resuKClts.results,
      }
    },
  })

  return (
    <ScrollShadow hideScrollBar size={5}>
      <Table
        color={"primary"}
        selectionMode="multiple"
        className="dark:pretty-scrollbar h-full w-[90vw] min-w-[90vw] table-auto overflow-auto rounded-lg dark:dark"
        aria-label="search history table"
        // sortDescriptor={list.sortDescriptor}
        // onSortChange={list.sort}
        onRowAction={(key) => null}
      >
        <TableHeader key={"Header"} className="h-10">
          <TableColumn key="searchValue" allowsSorting>
            Tool Name
          </TableColumn>
          <TableColumn key="timestamp">
            <Dropdown className="dark:dark">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  className="flex w-full items-center justify-start "
                  variant="light"
                >
                  {results.categories[category1]}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {results.categories.map((category, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => {
                        setCategory1(index)
                        console.log("CATEGORY 1: ", category1)
                        changeTableResults(index, category2)
                        // let results = changeTableResults(index, category2);
                        // setResultsTable(results);
                      }}
                    >
                      {category}
                    </DropdownItem>
                  )
                })}
                {/* <DropdownItem>
                  <div className="flex flex-row items-center gap-3"></div>
                </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </TableColumn>
          <TableColumn key="time" allowsSorting={true}>
            {results.categories[category2]}
          </TableColumn>
        </TableHeader>

        <TableBody
          items={resultsTable as Service[]}
          emptyContent={"No History"}
          className="pretty-scrollbar"
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: Service) => (
            <TableRow key={item.Name} className="cursor-pointer select-none">
              {
                // <TableCell className="text-md">{item.Name}</TableCell>
                // item.Categories = [...item.Categories, {Name: "Name", Value: item.Name}]
                item.Categories.filter((category) => {
                  return (
                    [
                      results.categories[category1],
                      results.categories[category2],
                    ].includes(category.Name) || category.Name === "Name"
                  )
                }).map((category, index) => {
                  console.log("WHAT!", category, " INDEX ", index)
                  return (
                    <TableCell key={`${category.Name}-${index} `}>
                      {category.Value}
                    </TableCell>
                  )
                })
              }
              {/* <TableCell>{item.Categories[0].Value}</TableCell>
              <TableCell>{item.Categories[1].Value}</TableCell> */}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollShadow>
  )
}

export default P3_ResultsTable
