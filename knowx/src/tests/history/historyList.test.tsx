// Diego Gutiérrez - A01284841

import { test, expect, vi } from "vitest"
import { screen, render, within } from "@testing-library/react"
import { mockHistory } from "../mocks/mock"
import { act } from "react"
import SearchHistoryList from "@/components/History/SearchHistoryList"

test("Search History List Correct Render Test", async () => {
  render(<SearchHistoryList history={mockHistory} />)

  // Check that the correct elements are rendered based on the mock data
  expect(screen.getByText("test")).toBeVisible()
  expect(screen.getByText("1/1/2021")).toBeVisible()

  expect(screen.getByText("test2")).toBeVisible()
  expect(screen.getByText("1/2/2021")).toBeVisible()
  expect(screen.getByText("test3")).toBeVisible()
  expect(screen.getByText("1/3/2021")).toBeVisible()
})

test("Search History List Actions Render Test", async () => {
  render(<SearchHistoryList history={mockHistory} />)

  let row = screen.getByRole("row", {
    name: /test2/i,
  })

  act(() => {
    within(row).getAllByRole("button")[0].click()
  })

  // Check that the "bad answer" button is now with the correct class
  expect(screen.getAllByRole("menuitem")[0]).not.toHaveClass("text-primary")
  expect(screen.getAllByRole("menuitem")[1]).toHaveClass("text-warning")

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

  // Check that the "good answer" button is now with the correct class
  expect(screen.getAllByRole("menuitem")[0]).toHaveClass("text-primary")
  expect(screen.getAllByRole("menuitem")[1]).not.toHaveClass("text-warning")
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
        name: "test 1/1/2021 6:00",
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
