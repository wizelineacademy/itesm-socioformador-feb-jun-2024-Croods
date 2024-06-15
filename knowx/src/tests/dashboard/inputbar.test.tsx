import { test, expect, vi } from "vitest"
import { screen, render } from "@testing-library/react"
import { act } from "react"

import InputBar from "@/components/Dashboard/InputBar"
import { mockHistory } from "../mocks/mock"

vi.mock("@/actions/search", () => ({
  clearSearches: () => {
    return
  },
  initialSearchAction: () => {
    return
  },
}))
vi.mock("@/actions/redirect", () => ({
  navigate: () => {
    return
  },
}))
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    null: null,
  }),
}))

test("InputBar loading state Test", async () => {
  render(<InputBar history={mockHistory} />)
  const button = screen.getByTitle("searchButton")
  const arrow = screen.getByTitle("searchArrowRight")

  expect(button).not.toBeNull()
  expect(arrow).not.toBeNull()
  expect(button).not.toHaveClass("pointer-events-none")

  act(() => {
    button.click()
  })

  expect(button).toHaveClass("pointer-events-none")
  expect(arrow).not.toBeVisible()
})
