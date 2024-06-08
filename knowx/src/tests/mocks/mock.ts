import { SimpleHistoryType } from "@/interfaces"

export const mockHistory: SimpleHistoryType[] = [
  {
    id: 1,
    search: "test",
    timestamp: new Date("2021-01-01"),
    feedback: -1,
  },
  {
    id: 352,
    search: "test2",
    timestamp: new Date("2021-01-02"),
    feedback: 0,
  },
  {
    id: 3,
    search: "test3",
    timestamp: new Date("2021-01-03"),
    feedback: 1,
  },
]
