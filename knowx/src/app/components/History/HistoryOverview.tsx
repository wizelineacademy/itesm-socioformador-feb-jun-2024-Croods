import { FullHistoryType } from "@/app/interfaces";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Chip,
  Divider,
} from "@nextui-org/react";

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
      <Chip color="secondary" variant="faded" className="mb-6 dark:dark">
        {formatDate(history.timeOfSearch!)}
      </Chip>
      <div className="w-full justify-center justify-items-center gap-4 grid grid-cols-4custom grid-rows-2 px-8 dark:dark">
        <Card className="w-full max-w-[300px] h-[300px]">
          <CardHeader className="z-10 top-1 flex-row !items-start gap-1">
            <SparklesIcon className="self-center h-6 w-6 mr-2 fill-slate-500" />
            <h4 className="text-white font-bold text-large">
              Topics Generated
            </h4>
          </CardHeader>
          <CardBody>
            <div>
              {transformToArray(history.generatedTopics!).map((topic) => (
                <Chip
                  key={topic}
                  color="warning"
                  variant="dot"
                  className="mr-2 mb-2"
                >
                  {topic}
                </Chip>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="w-full max-w-[300px] h-[300px]">
          <CardHeader className="z-10 top-1 flex-row !items-start gap-1">
            <BookmarkIcon className="self-center h-5 w-5 mr-2 fill-slate-500" />
            <h4 className="text-white font-bold text-large">Topics Selected</h4>
          </CardHeader>
          <CardBody>
            <div>
              {transformToArray(history.selectedTopics!).map((topic) => (
                <Chip
                  key={topic}
                  color="warning"
                  variant="dot"
                  className="mr-2 mb-2"
                >
                  {topic}
                </Chip>
              ))}
            </div>
          </CardBody>
        </Card>

        <Divider orientation="vertical" className="mx-5" />

        <Card className="w-full max-w-[300px] h-[300px]">
          <CardHeader className="z-10 top-1 flex-row !items-start gap-1">
            <SparklesIcon className="self-center h-6 w-6 mr-2 fill-slate-500" />
            <h4 className="text-white font-bold text-large">
              Categories Generated
            </h4>
          </CardHeader>
          <CardBody>
            <div>
              {transformToArray(history.generatedCategories!).map((topic) => (
                <Chip
                  key={topic}
                  color="warning"
                  variant="dot"
                  className="mr-2 mb-2"
                >
                  {topic}
                </Chip>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="w-full max-w-[300px] h-[300px]">
          <CardHeader className="z-10 top-1 flex-row !items-start gap-1">
            <BookmarkIcon className="self-center h-5 w-5 mr-2 fill-slate-500" />
            <h4 className="text-white font-bold text-large">
              Categories Selected
            </h4>
          </CardHeader>
          <CardBody className="">
            <div>
              {transformToArray(history.selectedCategories!).map((topic) => (
                <Chip
                  key={topic}
                  color="warning"
                  variant="dot"
                  className="mr-2 mb-2"
                >
                  {topic}
                </Chip>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
