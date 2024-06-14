// made by ozner

import { render, screen, fireEvent } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import { P2_CategoryResults } from "@/components/Phase2/P2_CategoryResults"

const defaultProps = {
  index: 1,
  feature: "Test Feature",
  isSelected: false,
  toggleCategory: vi.fn(),
}

test("P2_CategoryResults renders correctly", () => {
  render(<P2_CategoryResults {...defaultProps} />)

  const button = screen.getByRole("button")
  expect(button).toBeVisible()
  expect(button).toHaveTextContent("Test Feature")
  expect(button).toHaveClass("bg-white")
  expect(button).not.toHaveClass("bg-purple-500")
})

test("P2_CategoryResults renders correctly when selected", () => {
  render(<P2_CategoryResults {...defaultProps} isSelected={true} />)

  const button = screen.getByRole("button")
  expect(button).toBeVisible()
  expect(button).toHaveTextContent("Test Feature")
  expect(button).toHaveClass("bg-purple-500")
  expect(button).not.toHaveClass("bg-white")
})

test("P2_CategoryResults handles click event", () => {
  render(<P2_CategoryResults {...defaultProps} />)

  const button = screen.getByRole("button")
  fireEvent.click(button)

  expect(defaultProps.toggleCategory).toHaveBeenCalledWith("Test Feature")
})
