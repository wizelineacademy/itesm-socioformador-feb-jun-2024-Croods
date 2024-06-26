//src/components/History/HistoyOverview.tsx
"use client"
import { FullHistoryType } from "@/interfaces"
import { Card, CardHeader, CardBody, Chip, Divider } from "@nextui-org/react"
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react"
import {
  SparklesIcon,
  BookmarkIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
import { useState } from "react"

import {
  deleteSearchLogAction,
  logGoodSearchAction,
  logBadSearchAction,
} from "@/actions/dbActions"

const formatDate = (date: Date) => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()

  const hours = date.getHours()
  const minutes = date.getMinutes()

  if (minutes < 10) {
    return `${month}/${day}/${year} - ${hours}:0${minutes}`
  }

  return `${month}/${day}/${year} - ${hours}:${minutes}`
}

const transformToArray = (data: string) => {
  return data.split(",")
}

export default function HistoryOverview({
  history,
  children,
}: {
  history: FullHistoryType
  children?: React.ReactNode
}) {
  const [searchHistory, setSearchHistory] = useState<FullHistoryType>(history)

  const deleteSearchLog = async (logId: number) => {
    await deleteSearchLogAction(logId)
    window.history.back()
  }

  const logGoodSearch = async (logId: number) => {
    await logGoodSearchAction(logId)

    setSearchHistory({
      ...searchHistory,
      feedback: 1,
    })
  }

  const logBadSearchInternal = async (logId: number) => {
    await logBadSearchAction(logId)

    setSearchHistory({
      ...searchHistory,
      feedback: 0,
    })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Chip color="warning" variant="flat" className="text-lg">
        {searchHistory.search}
      </Chip>

      {searchHistory.timeOfSearch && (
        <Chip color="secondary" variant="faded" className="mb-6 dark:dark">
          {formatDate(searchHistory.timeOfSearch)}
        </Chip>
      )}

      <ButtonGroup className="absolute bottom-0 left-5 mb-5 dark:dark">
        <Button
          isIconOnly
          color="default"
          id="GoodAnswer"
          className={searchHistory.feedback == 1 ? "text-primary" : ""}
          disabled={searchHistory.feedback == 1}
          onClick={() => logGoodSearch(searchHistory.id)}
        >
          <HandThumbUpIcon className="h-5 w-5" />
        </Button>

        <Button
          isIconOnly
          id="BadAnswer"
          color="default"
          className={searchHistory.feedback == 0 ? "text-warning" : ""}
          disabled={searchHistory.feedback == 0}
          onClick={() => logBadSearchInternal(searchHistory.id)}
        >
          <HandThumbDownIcon className="h-5 w-5" />
        </Button>

        <Popover className="dark:dark">
          <PopoverTrigger>
            <Button isIconOnly color="danger">
              <TrashIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="m-1 flex flex-col gap-1">
              <Button className="!rounded-lg" color="default">
                Cancel
              </Button>
              <Button
                className="!rounded-lg"
                color="danger"
                onClick={() => deleteSearchLog(searchHistory.id)}
              >
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </ButtonGroup>

      <div className="grid w-full grid-cols-4custom justify-center justify-items-center gap-4 px-8 dark:dark">
        <Card className="h-[300px] w-full max-w-[300px]">
          <CardHeader className="top-1 z-10 flex-row !items-start gap-1">
            <SparklesIcon className="mr-2 h-6 w-6 self-center fill-slate-500" />
            <h4 className="text-large font-bold text-backgroundDark dark:text-white">
              Topics Generated
            </h4>
          </CardHeader>

          {searchHistory.generatedTopics ? (
            <CardBody>
              <div>
                {transformToArray(searchHistory.generatedTopics).map(
                  (topic) => (
                    <Chip
                      key={topic}
                      color="warning"
                      variant="dot"
                      className="mb-2 mr-2"
                    >
                      {topic}
                    </Chip>
                  ),
                )}
              </div>
            </CardBody>
          ) : (
            <CardBody>
              <Chip variant="dot" color="danger">
                No data
              </Chip>
            </CardBody>
          )}
        </Card>

        <Card className="h-[300px] w-full max-w-[300px]">
          <CardHeader className="top-1 z-10 flex-row !items-start gap-1">
            <BookmarkIcon className="mr-2 h-5 w-5 self-center fill-slate-500" />
            <h4 className="text-large font-bold text-backgroundDark dark:text-white">
              Topics Selected
            </h4>
          </CardHeader>

          {searchHistory.selectedTopics ? (
            <CardBody>
              <div>
                {transformToArray(searchHistory.selectedTopics).map((topic) => (
                  <Chip
                    key={topic}
                    color="warning"
                    variant="dot"
                    className="mb-2 mr-2"
                  >
                    {topic}
                  </Chip>
                ))}
              </div>
            </CardBody>
          ) : (
            <CardBody>
              <Chip variant="dot" color="danger">
                No data
              </Chip>
            </CardBody>
          )}
        </Card>

        <Divider orientation="vertical" className="mx-5" />

        <Card className="h-[300px] w-full max-w-[300px]">
          <CardHeader className="top-1 z-10 flex-row !items-start gap-1">
            <SparklesIcon className="mr-2 h-6 w-6 self-center fill-slate-500" />
            <h4 className="text-large font-bold text-backgroundDark dark:text-white">
              Categories Generated
            </h4>
          </CardHeader>

          {searchHistory.generatedCategories ? (
            <CardBody>
              <div>
                {transformToArray(searchHistory.generatedCategories).map(
                  (topic) => (
                    <Chip
                      key={topic}
                      color="warning"
                      variant="dot"
                      className="mb-2 mr-2"
                    >
                      {topic}
                    </Chip>
                  ),
                )}
              </div>
            </CardBody>
          ) : (
            <CardBody>
              <Chip variant="dot" color="danger">
                No data
              </Chip>
            </CardBody>
          )}
        </Card>

        <Card className="h-[300px] w-full max-w-[300px]">
          <CardHeader className="top-1 z-10 flex-row !items-start gap-1">
            <BookmarkIcon className="mr-2 h-5 w-5 self-center fill-slate-500" />
            <h4 className="text-large font-bold text-backgroundDark dark:text-white">
              Categories Selected
            </h4>
          </CardHeader>

          {searchHistory.selectedCategories ? (
            <CardBody>
              <div>
                {transformToArray(searchHistory.selectedCategories).map(
                  (topic) => (
                    <Chip
                      key={topic}
                      color="warning"
                      variant="dot"
                      className="mb-2 mr-2"
                    >
                      {topic}
                    </Chip>
                  ),
                )}
                {searchHistory.addedCategories &&
                  transformToArray(searchHistory.addedCategories).map(
                    (topic) => (
                      <Chip
                        key={topic}
                        color="secondary"
                        variant="dot"
                        className="mb-2 mr-2"
                      >
                        {topic}
                      </Chip>
                    ),
                  )}
              </div>
            </CardBody>
          ) : (
            <CardBody>
              <Chip variant="dot" color="danger">
                No data
              </Chip>
            </CardBody>
          )}
        </Card>
      </div>

      {children}
    </div>
  )
}
