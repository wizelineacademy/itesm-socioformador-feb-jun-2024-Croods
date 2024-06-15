// src/tests/compare/Compare_Button.test.tsx

// Vitest (Sofía Cantú A01571120)
import { render, screen, fireEvent } from "@testing-library/react"
import { Compare_Button } from "@/components/Compare/Compare_Button"
import { useRouter } from "next/navigation"
import { backToPhase3 } from "@/actions/redirect"
import { expect, vi, Mock } from "vitest"
vi.mock("next/navigation")

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}))

vi.mock("@/actions/redirect", () => ({
  backToPhase3: vi.fn(),
}))

const mockUseRouter = useRouter as Mock

describe("Compare_Button", () => {
  it("renders correctly", () => {
    render(<Compare_Button />)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent("Back")
  })

  it("calls backToPhase3 on click when isHistory is false", () => {
    render(<Compare_Button isHistory={false} />)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    expect(backToPhase3).toHaveBeenCalled()
  })

  it("calls router.back on click when isHistory is true", () => {
    const back = vi.fn()
    mockUseRouter.mockReturnValue({ back })
    render(<Compare_Button isHistory={true} />)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    expect(back).toHaveBeenCalled()
  })
})
