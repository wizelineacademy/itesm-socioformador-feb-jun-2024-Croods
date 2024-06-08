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

import { ChevronDownIcon } from "@heroicons/react/20/solid"

import { useState, useEffect } from "react"

import { Service, Results } from "@/interfaces/Phase3"
import { toggleCompares } from "@/actions/compare"

export const P3_ResultsTable = ({
  incoming_results,
}: {
  incoming_results: Results
}) => {
  const [currentColumns, setCurrentColumns] = useState<Set<string>>(
    new Set([incoming_results.categories[0], incoming_results.categories[1]]),
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
    return categories
  }

  const checkCategories = (): string[] => {
    const categories: string[] = []
    if (incoming_results.categories != undefined) {
      categories.push("Name")
      categories.push("Description")
      incoming_results.categories.forEach((category) => {
        if (category != "Name" && category != "Description")
          categories.push(category)
      })
    }
    return categories
  }

  useEffect(() => {
    const handleRowUpdate = () => {
      toggleCompares(currentRows)
    }
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
            checkCategories().map((category) => {
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
        </DropdownMenu>
      </Dropdown>
      <ScrollShadow hideScrollBar size={5}>
        <Table
          color={"primary"}
          selectionMode="multiple"
          className="dark:pretty-scrollbar h-full w-[90vw] min-w-[90vw] table-auto overflow-auto rounded-lg dark:dark"
          aria-label="search history table"
          onSelectionChange={(keys: Set<string>) => {
            setCurrentRows(keys as Set<string>)
          }}
        >
          <TableHeader key={"Header"} className="h-10">
            {checkCategories()
              .filter((category) => {
                return Array.from(currentColumns).includes(category)
              })
              .map((column) => {
                return <TableColumn key={column}>{column}</TableColumn>
              })}
          </TableHeader>
          <TableBody
            items={incoming_results.results as Service[]}
            emptyContent={"No History"}
            className="pretty-scrollbar"
            loadingContent={<Spinner label="Loading..." />}
          >
            {(item: Service) => (
              <TableRow key={item.Name} className="cursor-pointer select-none">
                {checkItemCategories(item)
                  .filter((category) => {
                    return Array.from(currentColumns).includes(category.Name)
                  })
                  .map((category, index) => {
                    return (
                      <TableCell key={`${category.Name}-${index} `}>
                        {category.Value}
                      </TableCell>
                    )
                  })}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollShadow>
    </div>
  )
}

export default P3_ResultsTable
