//Test for the render of a new column in the results table - Carolina González A01284948
import { test, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import { mockResultsTable } from "../mocks/mock"
import P3_ResultsTable from "@/components/Phase3/P3_ResultsTable"
import { act } from "react"

vi.mock("@/actions/compare", () => ({
  toggleCompares: () => {
    return
  },
}))

test("Show new column render test ", async () => {
  render(<P3_ResultsTable incoming_results={mockResultsTable.results} />)

  expect(screen.getByText("Columns")).toBeVisible()

  act(() => {
    screen.getByRole("button", { name: /columns/i }).click()
  })

  act(() => {
    screen
      .getByRole("menuitemcheckbox", {
        name: /NewColumn/i,
      })
      .click()
  })

  expect(screen.getByText("NewColumn")).toBeInTheDocument()
})
