// Vitest (Ozner Leyva A01742377)

import { render, screen } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import P3_CompareButton from "@/components/Phase3/P3_CompareButton"

vi.mock("@/actions/redirect", () => ({
  navigateToCompare: vi.fn(),
  navigateToHistoryCompare: vi.fn(),
}))

vi.mock("@/actions/search", () => ({
  loadResultsCookie: vi.fn(),
}))

test("P3_CompareButton renders correctly", () => {
  render(<P3_CompareButton />)

  const button = screen.getByRole("button", { name: /compare/i })

  expect(button).toBeVisible()
  expect(button).toHaveTextContent("Compare")
})
