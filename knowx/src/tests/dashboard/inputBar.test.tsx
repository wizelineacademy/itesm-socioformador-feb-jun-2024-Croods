// Diego Gutiérrez - A01284841

import InputBar from "@/components/Dashboard/InputBar"
import { test, expect, vi } from "vitest"
import { screen, render, fireEvent } from "@testing-library/react"
import { mockHistory } from "../mocks/mock"
import { act } from "react"

const mockLink = vi.fn()

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: (url: string) => mockLink(url),
  }),
}))

vi.mock("@/actions/redirect", () => ({
  navigate: (url: string) => mockLink(url),
}))

vi.mock("@/actions/search", () => ({
  initialSearchAction: async (query: string) => {
    return query
  },
  clearSearches: () => {},
}))

test("Input Bar Correct Render Test", async () => {
  render(<InputBar history={mockHistory} />)

  expect(screen.getByRole("textbox")).toBeVisible()
  expect(screen.getByRole("textbox")).toHaveDisplayValue("")
})

test("Input Bar Correct History Test", async () => {
  render(<InputBar history={mockHistory} />)

  // Type in the input bar the word "test"
  // act(() => {
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "test" },
  })
  // })

  // Check if the suggestions are displayed
  expect(screen.getByText("test")).toBeVisible()
  expect(screen.getByText("test2")).toBeVisible()
  expect(screen.getByText("test3")).toBeVisible()

  // Check if the suggestions are not displayed
  // act(() => {
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "" },
  })
  // })

  // Check if the suggestions are not displayed when nothing is typed in
  expect(screen.queryByText("test")).toBeNull()
  expect(screen.queryByText("test2")).toBeNull()
  expect(screen.queryByText("test3")).toBeNull()
})

test("Input Bar Correct Redirect Test", async () => {
  render(<InputBar history={mockHistory} />)

  // Type in the input bar the word "test"
  // act(() => {
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "test" },
  })
  // })

  // Click on the search button
  act(() => {
    screen.getByTitle("Search Button").click()
  })

  // Check if the navigate function was called with the correct argument
  expect(mockLink).toHaveBeenCalledWith("test")
})

test("Input Bar Correct Redirect Test 2", async () => {
  render(<InputBar history={mockHistory} />)

  // Type in the input bar the word "test"
  // act(() => {
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "this is a search" },
  })
  // })

  // Click on the search button
  act(() => {
    screen.getByTitle("Search Button").click()
  })

  // Check if the navigate function was called with the correct argument
  expect(mockLink).toHaveBeenCalledWith("this is a search")
})
