import Header from "@/components/Header"
import { test, expect } from "vitest"
import { screen, render, fireEvent } from "@testing-library/react"
import { SessionProvider } from "next-auth/react"
import { act } from "react"

test("Header Correct Render Test", async () => {
  render(
    <SessionProvider
      session={{
        user: {
          email: "test@gmail.com",
          name: "Test User",
        },
        expires: "",
      }}
    >
      <Header isDashboard={true} userMenuShowBoth={false} />
    </SessionProvider>,
  )

  expect(screen.getByText("Test User")).toBeInTheDocument()
  expect(screen.getByAltText("KnowX Logo")).toBeVisible()
  expect(screen.getByTitle("User Menu")).toBeVisible()
})

const mockLink = vi.fn()

vi.mock("@/actions/redirect", () => ({
  navigateToDashboard: () => {
    mockLink("/dashboard")
  },
  navigateToHistory: () => {
    mockLink("/history")
  },
}))

test("Header Correct Redirect Test", async () => {
  render(
    <SessionProvider
      session={{
        user: {
          email: "test@gmail.com",
          name: "Test User",
        },
        expires: "",
      }}
    >
      <Header isDashboard={true} userMenuShowBoth={false} />
    </SessionProvider>,
  )

  // Test for the logo redirect to dashboard
  act(() => {
    screen.getByAltText("KnowX Logo").click()
  })

  expect(mockLink).toHaveBeenCalledWith("/dashboard")

  // Test for the user menu redirect to history
  act(() => {
    fireEvent.click(screen.getByTitle("dropdown-btn-icon"))
  })

  act(() => {
    fireEvent.click(screen.getByText("History"))
  })

  expect(mockLink).toHaveBeenCalledWith("/history")
})
