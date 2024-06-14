import { test, expect, vi } from "vitest"
import { screen, render } from "@testing-library/react"
import { act } from "react"

import P1_ResultsWrapper from "@/components/Phase1/P1_ResultsWrapper"
import { SessionProvider } from "next-auth/react"

vi.mock("@/actions/redirect", () => ({
  navigateToPhase2: () => ({
    null: null,
  }),
}))

test("Phase 1 Button loading state", async () => {
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
      <P1_ResultsWrapper query="Something">
        <p key={1}>Test</p>
        <p key={2}>Test</p>
      </P1_ResultsWrapper>
    </SessionProvider>,
  )

  const button = screen.getByTitle("searchButton")
  expect(button).not.toBeNull()
  expect(button).not.toHaveClass("pointer-events-none")
  act(() => {
    button.click()
  })
  expect(button).toHaveClass("pointer-events-none")
})
