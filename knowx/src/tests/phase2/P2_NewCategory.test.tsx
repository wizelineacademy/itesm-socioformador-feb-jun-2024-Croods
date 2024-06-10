// made by ozner

import { render, screen, fireEvent } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import P2_NewCategory from "@/components/Phase2/P2_NewCategory"
import { addCategory } from "@/actions/search"
import { navigateToPhase3 } from "@/actions/redirect"

vi.mock("@/actions/search", () => ({
  addCategory: vi.fn(),
}))

vi.mock("@/actions/redirect", () => ({
  navigateToPhase3: vi.fn(),
}))

test("P2_NewCategory renders correctly", () => {
  render(<P2_NewCategory />)

  const input = screen.getByPlaceholderText("Type new category")
  const button = screen.getByRole("button")

  expect(input).toBeVisible()
  expect(button).toBeVisible()
})

test("P2_NewCategory handles input change", () => {
  render(<P2_NewCategory />)

  const input = screen.getByPlaceholderText("Type new category")
  fireEvent.change(input, { target: { value: "Test Category" } })

  expect(input).toHaveValue("Test Category")
})

test("P2_NewCategory adds new category and clears input", () => {
  render(<P2_NewCategory />)

  const input = screen.getByPlaceholderText("Type new category")
  const button = screen.getByRole("button")

  fireEvent.change(input, { target: { value: "Test Category" } })
  fireEvent.click(button)

  expect(addCategory).toHaveBeenCalledWith({
    obj: "Test Category",
    isAdded: true,
  })
  expect(input).toHaveValue("")
})

test("P2_NewCategory navigates to phase 3 when input is empty", () => {
  render(<P2_NewCategory />)

  const button = screen.getByRole("button")

  fireEvent.click(button)

  expect(navigateToPhase3).toHaveBeenCalled()
})
