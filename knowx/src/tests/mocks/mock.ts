import { SimpleHistoryType } from "@/interfaces"

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
