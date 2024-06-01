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

import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid"
import { useAsyncList } from "@react-stately/data"

import { useState, useEffect } from "react"

import { ResultsTableProps, Service } from "@/app/interfaces/Phase3"
import { toggleCompares } from "@/app/actions/compare"

export const P3_ResultsTable = ({ results }: ResultsTableProps) => {
  const [currentColumns, setCurrentColumns] = useState<Set<string>>(
    new Set([results.categories[0], results.categories[1]]),
  )
  const [currentRows, setCurrentRows] = useState<Set<string>>(new Set())

  const checkItemCategories = (item: Service) => {
    const categories: { Name: string; Value: string }[] = []
    categories.push({ Name: "Name", Value: item.Name })
    categories.push({ Name: "Description", Value: item.Description })
    item.Categories.forEach((category) => {
      if (category.Name === "Name") return
      if (category.Name === "Description") return
      categories.push(category)
    })
    if (currentColumns.size == 0)
      setCurrentColumns(new Set([categories[0].Name, categories[1].Name]))
    console.log("CATEGORIES -> ", categories)
    return categories
  }

  const checkCategories = (): string[] => {
    const categories: string[] = []
    if (results.categories != undefined) {
      categories.push("Name")
      categories.push("Description")
      results.categories.forEach((category) => {
        if (category != "Name" && category != "Description")
          categories.push(category)
      })
    }
    return categories
  }

  useEffect(() => {
    const handleRowUpdate = () => {
      toggleCompares(currentRows, results)
      console.log("Doing")
    }
    // console.log(currentRows);
    handleRowUpdate()
  }, [currentRows])

  return (
    <div>
      <Dropdown className="dark:dark">
        <DropdownTrigger>
          <Button
            isIconOnly
            size="sm"
            className="my-5 flex w-[200px] items-center justify-between p-5"
            variant="flat"
            color="default"
            className="flex w-full items-center justify-start "
            variant="light"
          >
            {"Columns"}
            <ChevronDownIcon className="h-5 w-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectionMode="multiple"
          closeOnSelect={false}
          selectedKeys={currentColumns}
          onSelectionChange={(keys) => setCurrentColumns(keys as Set<string>)}
        >
          {checkCategories() != undefined ? (
            checkCategories().map((category, index) => {
              return (
                <DropdownItem key={category} onClick={() => {}}>
                  {category}
                </DropdownItem>
              )
            })
          ) : (
            <DropdownItem key={"NO DATA"} onClick={() => {}}>
              {"No Columns"}
            </DropdownItem>
          )}
          {/* <DropdownItem>
                  <div className="flex flex-row items-center gap-3"></div>
                </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
      <ScrollShadow hideScrollBar size={5}>
        <Table
          color={"primary"}
          selectionMode="multiple"
          className="dark:pretty-scrollbar h-full w-[90vw] min-w-[90vw] table-auto overflow-auto rounded-lg dark:dark"
          aria-label="search history table"
          onSelectionChange={(keys) => {
            // setCurrentRows(key);
            setCurrentRows(keys as Set<string>)
            // console.log("HUH", currentRows);
            // console.log(key);
          }}
          // sortDescriptor={list.sortDescriptor}
          // onSortChange={list.sort}
          onRowAction={(key) => console.log("HUH?")}
        >
          <TableHeader key={"Header"} className="h-10">
            {checkCategories()
              .filter((category, index) => {
                return Array.from(currentColumns).includes(category)
              })
              .map((column, index) => {
                return <TableColumn key={column}>{column}</TableColumn>
              })}
          </TableHeader>
          <TableBody
            items={results.results as Service[]}
            emptyContent={"No History"}
            className="pretty-scrollbar"
            loadingContent={<Spinner label="Loading..." />}
          >
            {(item: Service) => (
              <TableRow key={item.Name} className="cursor-pointer select-none">
                {
                  // <TableCell className="text-md">{item.Name}</TableCell>
                  // item.Categories = [...item.Categories, {Name: "Name", Value: item.Name}]
                  checkItemCategories(item)
                    .filter((category) => {
                      console.log(
                        "FILTERING -> ",
                        category.Name,
                        category.Value,
                        " RESULT ",
                        Array.from(currentColumns).includes(category.Name),
                      )
                      return Array.from(currentColumns).includes(category.Name)
                    })
                    .map((category, index) => {
                      console.log("MAPPING -> ", category.Name, category.Value)
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
    </div>
  )
}

export default P3_ResultsTable
