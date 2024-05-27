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

import { useAsyncList } from "@react-stately/data";

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

import { useState, useEffect } from "react";

import {
  ResultsTableProps,
  Service,
  Results,
  ServiceCategories,
} from "@/app/interfaces/Phase3";
import { use } from "chai";
import { lutimesSync } from "fs";

export const P3_ResultsTable = ({ results }: ResultsTableProps) => {
  const [category1, setCategory1] = useState<number>(0);
  const [category2, setCategory2] = useState<number>(1);
  const [currentColumns, setCurrentColumns] = useState<Set<string>>(
    new Set([results.categories[category1], results.categories[category2]])
  );

  return (
    <div>
      <Dropdown className="dark:dark">
        <DropdownTrigger>
          <Button
            isIconOnly
            size="sm"
            className="w-full flex justify-start items-center "
            variant="light"
          >
            {"Columns"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectionMode="multiple"
          closeOnSelect={false}
          selectedKeys={currentColumns}
          onSelectionChange={(keys) => setCurrentColumns(keys)}
        >
          {results.categories.map((category, index) => {
            return (
              <DropdownItem key={category} onClick={() => {}}>
                {category}
              </DropdownItem>
            );
          })}
          {/* <DropdownItem>
                  <div className="flex flex-row items-center gap-3"></div>
                </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
      <ScrollShadow hideScrollBar size={5}>
        <Table
          color={"primary"}
          selectionMode="multiple"
          className="rounded-lg overflow-auto min-w-[90vw] h-full table-auto w-[90vw] dark:dark dark:pretty-scrollbar"
          aria-label="search history table"
          // sortDescriptor={list.sortDescriptor}
          // onSortChange={list.sort}
          onRowAction={(key) => null}
        >
          <TableHeader key={"Header"} className="h-10">
            {results.categories
              .filter((category, index) => {
                return Array.from(currentColumns).includes(category);
              })
              .map((column, index) => {
                return (
                  <TableColumn key={column} allowsSorting>
                    {column}
                  </TableColumn>
                );
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
                  item.Categories.filter((category) => {
                    return Array.from(currentColumns).includes(category.Name);
                  }).map((category, index) => {
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
