// src/tests/compare/Compare_Card.test.tsx

// Vitest (Sofía Cantú A01571120)
import { render, screen, fireEvent } from "@testing-library/react"
import { Compare_Card } from "@/components/Compare/Compare_Card"
import { Results } from "@/interfaces/Phase3"
import { expect } from "vitest"

const mockData: Results = {
  results: [
    {
      Name: "Service1",
      Description: "Description1",
      Categories: [{ Name: "Category1", Value: "Value1" }],
    },
  ],
  categories: [],
}

describe("Compare_Card", () => {
  it("renders correctly with initial data", () => {
    render(
      <Compare_Card
        initialTitle="Initial Title"
        initialDescription="Initial Description"
        initialData={mockData.results[0].Categories}
        titles={["Service1"]}
        allData={mockData}
      />,
    )

    expect(screen.getByText("Initial Title")).toBeInTheDocument()
    expect(screen.getByText("Initial Description")).toBeInTheDocument()
    expect(screen.getByText("Category1")).toBeInTheDocument()
  })

  it("updates data on title selection", () => {
    render(
      <Compare_Card
        initialTitle="Initial Title"
        initialDescription="Initial Description"
        initialData={mockData.results[0].Categories}
        titles={["Service1"]}
        allData={mockData}
      />,
    )

    fireEvent.click(screen.getByRole("button"))
    fireEvent.click(screen.getByText("Service1"))

    expect(screen.getByText("Service1")).toBeInTheDocument()
    expect(screen.getByText("Description1")).toBeInTheDocument()
    expect(screen.getByText("Category1")).toBeInTheDocument()
  })
})
