import { SimpleHistoryType } from "@/interfaces"
import { CardProps } from "@/components/Compare/Compare_Card"
import { ResultsTableProps } from "@/interfaces/Phase3"

export const mockResultsTable: ResultsTableProps = {
  results: {
    results: [
      {
        Name: "TestColumn",
        Description: "DescriptionTest",
        Categories: [
          { Name: "Name", Value: "TestColumn" },
          { Name: "Price", Value: "100" },
          { Name: "NewColumn", Value: "NewValue" },
        ],
      },
    ],
    categories: ["Name", "Price", "NewColumn"],
  },
}

export const mockCardProps: CardProps = {
  initialTitle: "test",
  initialDescription: "InitialDescription",
  initialData: [
    {
      Name: "initialDataName",
      Value: "initialDataValue",
    },
  ],
  titles: ["test", "titles2"],
  allData: {
    categories: ["Name", "Price"],
    results: [
      {
        Name: "titles2",
        Description: "Description2",
        Categories: [
          { Name: "Name", Value: "titles2" },
          { Name: "Price", Value: "Price2" },
        ],
      },
    ],
  },
}

export const mockHistoryTest: SimpleHistoryType[] = [
  {
    id: 1,
    search: "test",
    timestamp: new Date("2021-01-01"),
    feedback: -1,
  },
  {
    id: 352,
    search: "top",
    timestamp: new Date("2021-01-02"),
    feedback: 0,
  },
  {
    id: 3,
    search: "new",
    timestamp: new Date("2021-01-03"),
    feedback: 1,
  },
]

export const mockHistory: SimpleHistoryType[] = [
  {
    id: 1,
    search: "test",
    timestamp: new Date(Date.UTC(2021, 0, 1, 12, 0, 0)),
    feedback: -1,
  },
  {
    id: 352,
    search: "test2",
    timestamp: new Date(Date.UTC(2021, 0, 2, 12, 0, 0)),
    feedback: 0,
  },
  {
    id: 3,
    search: "test3",
    timestamp: new Date(Date.UTC(2021, 0, 3, 12, 0, 0)),
    feedback: 1,
  },
]
