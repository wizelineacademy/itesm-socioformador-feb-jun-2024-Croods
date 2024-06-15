import { test, expect, vi } from "vitest"
import { screen, render } from "@testing-library/react"
import { act } from "react"

import { P2_DynamicButton } from "@/components/Phase2/P2_DynamicButton"
import { SessionProvider } from "next-auth/react"
import { PlusIcon } from "@heroicons/react/24/outline"

import { navigateToPhase3 } from "@/actions/redirect"

vi.mock("@/actions/redirect", () => ({
  navigateToPhase3: () => ({
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
      <P2_DynamicButton function={navigateToPhase3} goingBack={false}>
        <PlusIcon />
      </P2_DynamicButton>
      ,
    </SessionProvider>,
  )

  const button = screen.getByTitle("submitButton")
  expect(button).not.toBeNull()
  expect(button).not.toHaveClass("pointer-events-none")
  act(() => {
    button.click()
  })
  expect(button).toHaveClass("pointer-events-none")
})
