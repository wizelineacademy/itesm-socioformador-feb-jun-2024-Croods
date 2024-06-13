// src/tests/informational/InfoButton.test.tsx

// made by Sofia
import { render, screen, fireEvent } from "@testing-library/react"
import InfoButton from "@/components/informational/InfoButton"
import { expect, vi } from "vitest"

describe("InfoButton", () => {
  it("renders correctly", () => {
    render(<InfoButton onClick={() => {}} />)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  it("calls onClick handler when clicked", () => {
    const onClick = vi.fn()
    render(<InfoButton onClick={onClick} />)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })
})
