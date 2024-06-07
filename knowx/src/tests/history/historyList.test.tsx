import { test, expect, vi } from "vitest"
import { screen, render, within } from "@testing-library/react"
import { mockHistory } from "../mocks/mock"
import { act } from "react"
import SearchHistoryList from "@/components/History/SearchHistoryList"

test("Search History List Correct Render Test", async () => {
  render(<SearchHistoryList history={mockHistory} />)

  expect(screen.getByText("test")).toBeVisible()
  expect(screen.getByText("12/31/2020")).toBeVisible()

  expect(screen.getByText("test2")).toBeVisible()
  expect(screen.getByText("1/1/2021")).toBeVisible()

  expect(screen.getByText("test3")).toBeVisible()
  expect(screen.getByText("1/2/2021")).toBeVisible()
})

test("Search History List Actions Render Test", async () => {
  render(<SearchHistoryList history={mockHistory} />)

  let row = screen.getByRole("row", {
    name: /test2/i,
  })

  act(() => {
    within(row).getAllByRole("button")[0].click()
  })

  expect(screen.getByTitle("Good Answer")).not.toHaveClass("text-primary")
  expect(screen.getByTitle("Bad Answer")).toHaveClass("text-warning")

  act(() => {
    screen
      .getByRole("button", {
        name: "Dismiss",
      })
      .click()
  })

  row = screen.getByRole("row", {
    name: /test3/i,
  })

  act(() => {
    within(row).getAllByRole("button")[0].click()
  })

  expect(screen.getAllByTitle("Good Answer")[1]).toHaveClass("text-primary")
  expect(screen.getAllByTitle("Bad Answer")[1]).not.toHaveClass("text-warning")
})

const mockLink = vi.fn()

vi.mock("@/actions/redirect", () => ({
  navigateToHistoryLog: (logId: string) => {
    mockLink(`/history/${logId}`)
  },
}))

test("Search History List Redirect Test", async () => {
  render(<SearchHistoryList history={mockHistory} />)

  act(() => {
    screen
      .getByRole("row", {
        name: "test",
      })
      .click()
  })

  expect(mockLink).toBeCalledWith("/history/1")

  act(() => {
    screen
      .getByRole("row", {
        name: /test2/i,
      })
      .click()
  })

  expect(mockLink).toBeCalledWith("/history/352")

  act(() => {
    screen
      .getByRole("row", {
        name: /test3/i,
      })
      .click()
  })

  expect(mockLink).toBeCalledWith("/history/3")
})
