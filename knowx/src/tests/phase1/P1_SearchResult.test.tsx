// Vitest (Ozner Leyva A01742377)
import { render, screen, fireEvent } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import P1_SearchResult from "@/components/Phase1/P1_SearchResult"
import { toggleSearchObject } from "@/actions/search"

vi.mock("@/actions/search", () => ({
  toggleSearchObject: vi.fn(),
}))

const defaultProps = {
  index: 1,
  content: "Test Content",
  isFavorite: false,
}

test("P1_SearchResult renders correctly", () => {
  render(<P1_SearchResult {...defaultProps} />)

  const button = screen.getByRole("button")
  expect(button).toBeVisible()
  expect(button).toHaveTextContent("Test Content")
  expect(button).toHaveClass("bg-black")
  expect(button).not.toHaveClass("bg-purple-500")
})

test("P1_SearchResult renders correctly when favorite", () => {
  render(<P1_SearchResult {...defaultProps} isFavorite={true} />)

  const button = screen.getByRole("button")
  expect(button).toBeVisible()
  expect(button).toHaveTextContent("Test Content")
  expect(button).toHaveClass("bg-purple-500")
  expect(button).not.toHaveClass("bg-black")
})

test("P1_SearchResult handles click event", () => {
  render(<P1_SearchResult {...defaultProps} />)

  const button = screen.getByRole("button")
  fireEvent.click(button)

  expect(toggleSearchObject).toHaveBeenCalledWith("Test Content")
})

test("P1_SearchResult handles key down event", () => {
  render(<P1_SearchResult {...defaultProps} />)

  const button = screen.getByRole("button")
  fireEvent.keyDown(button, { key: "Enter", code: "Enter" })

  expect(toggleSearchObject).toHaveBeenCalledWith("Test Content")
})
