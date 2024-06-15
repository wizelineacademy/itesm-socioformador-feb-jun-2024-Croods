//Test for the render and redirect correct options on the UserMenu - Carolina González A01284948
import { test, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import Header from "@/components/Header"
import { act } from "react"
import { SessionProvider } from "next-auth/react"

test("Check User Menu on Dashboard", async () => {
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
      <Header isDashboard={true} />
    </SessionProvider>,
  )

  act(() => {
    screen.getByRole("button", { name: "" }).click()
  })

  expect(screen.getByText("History")).toBeVisible()
})

test("Check User Menu on History", async () => {
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
      <Header isDashboard={false} />
    </SessionProvider>,
  )

  act(() => {
    screen.getByRole("button", { name: "" }).click()
  })

  expect(screen.getByText("Dashboard")).toBeVisible()
})
