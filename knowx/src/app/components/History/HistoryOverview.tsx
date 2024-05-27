import { FullHistoryType } from "@/app/interfaces";
import { Card, CardHeader, CardBody, Chip, Divider } from "@nextui-org/react";

import { SparklesIcon, BookmarkIcon } from "@heroicons/react/20/solid";

const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (minutes < 10) {
    return `${month}/${day}/${year} - ${hours}:0${minutes}`;
  }

  return `${month}/${day}/${year} - ${hours}:${minutes}`;
};

const transformToArray = (data: string) => {
  return data.split(",");
};

export default function HistoryOverview({
  history,
}: {
  history: FullHistoryType;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Chip color="warning" variant="flat" className="text-lg">
        {history.search}
      </Chip>
      {history.timeOfSearch && (
        <Chip color="secondary" variant="faded" className="mb-6 dark:dark">
          {formatDate(history.timeOfSearch)}
        </Chip>
      )}
      <div className="grid w-full grid-cols-4custom grid-rows-2 justify-center justify-items-center gap-4 px-8 dark:dark">
        <Card className="h-[300px] w-full max-w-[300px]">
          <CardHeader className="top-1 z-10 flex-row !items-start gap-1">
            <SparklesIcon className="mr-2 h-6 w-6 self-center fill-slate-500" />
            <h4 className="text-large font-bold text-backgroundDark dark:text-white">
              Topics Generated
            </h4>
          </CardHeader>
          {history.generatedTopics && (
            <CardBody>
              <div>
                {transformToArray(history.generatedTopics).map((topic) => (
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
          )}
        </Card>

        {history.selectedTopics && (
          <Card className="h-[300px] w-full max-w-[300px]">
            <CardHeader className="top-1 z-10 flex-row !items-start gap-1">
              <BookmarkIcon className="mr-2 h-5 w-5 self-center fill-slate-500" />
              <h4 className="text-large font-bold text-backgroundDark dark:text-white">
                Topics Selected
              </h4>
            </CardHeader>
            <CardBody>
              <div>
                {transformToArray(history.selectedTopics).map((topic) => (
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
          </Card>
        )}

        <Divider orientation="vertical" className="mx-5" />

        {history.generatedCategories && (
          <Card className="h-[300px] w-full max-w-[300px]">
            <CardHeader className="top-1 z-10 flex-row !items-start gap-1">
              <SparklesIcon className="mr-2 h-6 w-6 self-center fill-slate-500" />
              <h4 className="text-large font-bold text-backgroundDark dark:text-white">
                Categories Generated
              </h4>
            </CardHeader>
            <CardBody>
              <div>
                {transformToArray(history.generatedCategories).map((topic) => (
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
          </Card>
        )}

        {history.selectedCategories && (
          <Card className="h-[300px] w-full max-w-[300px]">
            <CardHeader className="top-1 z-10 flex-row !items-start gap-1">
              <BookmarkIcon className="mr-2 h-5 w-5 self-center fill-slate-500" />
              <h4 className="text-large font-bold text-backgroundDark dark:text-white">
                Categories Selected
              </h4>
            </CardHeader>
            <CardBody className="">
              <div>
                {transformToArray(history.selectedCategories).map((topic) => (
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
          </Card>
        )}
      </div>
    </div>
  );
}
