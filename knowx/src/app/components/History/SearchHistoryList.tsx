"use client";
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
} from "@nextui-org/react";
import BubbleText from "./BubbleText";
import { useAsyncList } from "@react-stately/data";
import { useState } from "react";
import { SimpleHistoryType } from "@/app/interfaces";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";

import {
  deleteSearchLogAction,
  logGoodSearchAction,
  logBadSearchAction,
} from "@/app/actions/dbActions";

import { navigateToHistoryLog } from "@/app/actions/redirect";

const dateFormatter = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

const timeFormatter = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (minutes < 10) {
    return `${hours}:0${minutes}`;
  }

  return `${hours}:${minutes}`;
};

export default function SearchHistoryList({
  history,
}: {
  history: SimpleHistoryType[] | [];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState(history || []);

  const openItem = (itemId: number) => {
    navigateToHistoryLog(itemId.toString());
  };

  const deleteSearchLog = async (logId: number) => {
    setIsLoading(true);
    await deleteSearchLogAction(logId);
    setSearchHistory((currentHistory) =>
      currentHistory.filter((item) => item.id !== logId)
    );
    historyList.items = searchHistory;
    setIsLoading(false);
  };

  const logGoodSearch = async (logId: number) => {
    await logGoodSearchAction(logId);

    setSearchHistory((currentHistory) =>
      currentHistory.map((item) =>
        item.id === logId ? { ...item, feedback: 1 } : item
      )
    );
  };

  const logBadSearchInternal = async (logId: number) => {
    await logBadSearchAction(logId);

    setSearchHistory((currentHistory) =>
      currentHistory.map((item) =>
        item.id === logId ? { ...item, feedback: 0 } : item
      )
    );
  };

  let historyList = useAsyncList({
    async load({ signal }) {
      setIsLoading(false);

      return {
        items: searchHistory,
      };
    },
    async sort({ items, sortDescriptor }) {
      setSearchHistory((prevHistory) =>
        prevHistory.sort((a: any, b: any) => {
          if (sortDescriptor.column === "timestamp") {
            return sortDescriptor.direction === "descending"
              ? a.timestamp.getDate() - b.timestamp.getDate()
              : b.timestamp.getDate() - a.timestamp.getDate();
          } else if (sortDescriptor.column === "searchValue") {
            return sortDescriptor.direction === "descending"
              ? a.search.localeCompare(b.search)
              : b.search.localeCompare(a.search);
          } else if (sortDescriptor.column === "time") {
            return sortDescriptor.direction === "descending"
              ? a.timestamp.getTime() - b.timestamp.getTime()
              : b.timestamp.getTime() - a.timestamp.getTime();
          }

          return 0;
        })
      );

      return {
        items: searchHistory,
      };
    },
  });

  return (
    <Table
      color={"primary"}
      sortDescriptor={historyList.sortDescriptor}
      onSortChange={historyList.sort}
      selectionMode="single"
      className="rounded-lg overflow-hidden min-w-full h-auto table-auto w-full dark:dark"
      aria-label="search history table"
      onRowAction={(key) => openItem(Number(key))}
    >
      <TableHeader className="h-10">
        <TableColumn key="searchValue" allowsSorting>
          SEARCH VALUE
        </TableColumn>
        <TableColumn key="timestamp" allowsSorting>
          DATE
        </TableColumn>
        <TableColumn key="time" allowsSorting={true}>
          TIME
        </TableColumn>
        <TableColumn key="actions">ACTIONS</TableColumn>
      </TableHeader>

      <TableBody
        items={searchHistory}
        emptyContent={"No History"}
        loadingContent={<Spinner label="Loading..." />}
        isLoading={isLoading}
      >
        {(item: SimpleHistoryType) => (
          <TableRow key={item.id} className="select-none cursor-pointer">
            <TableCell className="text-md">{item.search}</TableCell>
            <TableCell>
              <BubbleText
                text={item.timestamp ? dateFormatter(item.timestamp) : ""}
              />
            </TableCell>
            <TableCell>
              <BubbleText
                text={item.timestamp ? timeFormatter(item.timestamp) : ""}
              />
            </TableCell>
            <TableCell>
              <div className="relative flex justify-end items-center gap-2">
                <Dropdown className="dark:dark">
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="primary"
                    >
                      <EllipsisVerticalIcon className="h-5 w-5 text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disabledKeys={
                      item.feedback == 1
                        ? ["thumbs-up"]
                        : item.feedback == 0
                        ? ["thumbs-down"]
                        : []
                    }
                  >
                    <DropdownItem
                      key={"thumbs-up"}
                      className={item.feedback == 1 ? "text-primary" : ""}
                    >
                      <div
                        className="flex flex-row items-center gap-3"
                        onClick={() =>
                          item.feedback != 1 && logGoodSearch(item.id)
                        }
                      >
                        <HandThumbUpIcon className="h-4 w-4" />
                        Good Answer
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      key={"thumbs-down"}
                      className={item.feedback == 0 ? "text-warning" : ""}
                    >
                      <div
                        className="flex flex-row items-center gap-3"
                        onClick={() =>
                          item.feedback != 0 && logBadSearchInternal(item.id)
                        }
                      >
                        <HandThumbDownIcon className="h-4 w-4" />
                        Bad Answer
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      className="text-danger"
                      color="danger"
                      onClick={() => deleteSearchLog(item.id)}
                    >
                      <div className="flex flex-row items-center gap-3">
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
