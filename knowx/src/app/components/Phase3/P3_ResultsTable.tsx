"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import {
  Spinner,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
  ScrollShadow,
} from "@nextui-org/react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { useState, useEffect } from "react";

import { ResultsTableProps, Service } from "@/app/interfaces/Phase3";
import { toggleCompares } from "@/app/actions/compare";

export const P3_ResultsTable = ({ results }: ResultsTableProps) => {
  const [currentColumns, setCurrentColumns] = useState<Set<string>>(
    results.categories != undefined
      ? new Set([results.categories[0], results.categories[1]])
      : new Set()
  );
  const [currentRows, setCurrentRows] = useState<Set<string>>(new Set());

  const checkCategories = (item: Service) => {
    let categories: { Name: string; Value: string }[] = [];
    let hasName = false,
      hasDescription = false;
    categories.push({ Name: "Name", Value: item.Name });
    categories.push({ Name: "Description", Value: item.Description });
    item.Categories.forEach((category) => {
      if (category.Name === "Name") return;
      if (category.Name === "Description") return;
      categories.push(category);
    });
    console.log("CATEGORIES -> ", categories);
    return categories;
  };

  useEffect(() => {
    const handleRowUpdate = () => {
      toggleCompares(currentRows, results);
      console.log("Doing");
    };
    // console.log(currentRows);
    handleRowUpdate();
  }, [currentRows]);

  return (
    <div>
      <Dropdown className="dark:dark">
        <DropdownTrigger>
          <Button
            isIconOnly
            size="sm"
            className="w-[200px] flex justify-between items-center p-5 my-5"
            variant="flat"
            color="default"
          >
            {"Columns"}
            <ChevronDownIcon className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectionMode="multiple"
          closeOnSelect={false}
          selectedKeys={currentColumns}
          onSelectionChange={(keys) => setCurrentColumns(keys as Set<string>)}
        >
          {results.categories != undefined ? (
            results.categories.map((category, index) => {
              return (
                <DropdownItem key={category} onClick={() => {}}>
                  {category}
                </DropdownItem>
              );
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
          className="rounded-lg overflow-auto min-w-[80vw] h-full table-auto w-[80vw] dark:dark dark:pretty-scrollbar"
          aria-label="search history table"
          onSelectionChange={(keys) => {
            // setCurrentRows(key);
            setCurrentRows(keys as Set<string>);
            // console.log("HUH", currentRows);
            // console.log(key);
          }}
          // sortDescriptor={list.sortDescriptor}
          // onSortChange={list.sort}
          onRowAction={(key) => console.log("HUH?")}
        >
          <TableHeader key={"Header"} className="h-10">
            {results.categories
              .filter((category, index) => {
                return Array.from(currentColumns).includes(category);
              })
              .map((column, index) => {
                return <TableColumn key={column}>{column}</TableColumn>;
              })}
          </TableHeader>
          <TableBody
            items={results.results as Service[]}
            emptyContent={"No History"}
            className="pretty-scrollbar"
            loadingContent={<Spinner label="Loading..." />}
          >
            {(item: Service) => (
              <TableRow key={item.Name} className="select-none cursor-pointer">
                {
                  // <TableCell className="text-md">{item.Name}</TableCell>
                  // item.Categories = [...item.Categories, {Name: "Name", Value: item.Name}]

                  checkCategories(item)
                    .filter((category) => {
                      console.log(
                        "FILTERING -> ",
                        category.Name,
                        category.Value,
                        " RESULT ",
                        Array.from(currentColumns).includes(category.Name)
                      );
                      return Array.from(currentColumns).includes(category.Name);
                    })
                    .map((category, index) => {
                      console.log("MAPPING -> ", category.Name, category.Value);
                      return (
                        <TableCell key={`${category.Name}-${index} `}>
                          {category.Value}
                        </TableCell>
                      );
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
  );
};

export default P3_ResultsTable;
