// src/tests/history/HistoryOverview.test.tsx

// Vitest (Sofía Cantú A01571120)
import { render, screen } from "@testing-library/react"
import HistoryOverview from "@/components/History/HistoryOverview"
import { vi } from "vitest"
import { FullHistoryType } from "@/interfaces"
import { expect } from "vitest"

vi.mock("@/actions/dbActions", () => ({
  deleteSearchLogAction: vi.fn(),
  logGoodSearchAction: vi.fn(),
  logBadSearchAction: vi.fn(),
}))

const mockHistory: FullHistoryType = {
  id: 1,
  search: "Test Search",
  generatedTopics: "Topic1, Topic2",
  selectedTopics: "Topic1",
  generatedCategories: "Category1, Category2",
  selectedCategories: "Category1",
  addedCategories: "Category1",
  searchResults: "Result1, Result2",
  timeOfSearch: new Date(),
  feedback: 0,
}

describe("HistoryOverview", () => {
  it("renders correctly", () => {
    render(<HistoryOverview history={mockHistory} />)
    expect(screen.getByText("Test Search")).toBeInTheDocument()
  })
})
