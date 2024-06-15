//Test for the render of the list of titles - Carolina González A01284948
import { test, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import { mockCardProps } from "../mocks/mock"
import { act } from "react"
import { Compare_Card } from "@/components/Compare/Compare_Card"

test("Compare Card Titles Render Test", async () => {
  render(
    <Compare_Card
      initialTitle={mockCardProps.initialTitle}
      initialDescription={mockCardProps.initialDescription}
      initialData={mockCardProps.initialData}
      titles={mockCardProps.titles}
      allData={mockCardProps.allData}
    />,
  )

  expect(screen.getByText("test")).toBeVisible()

  act(() => {
    screen
      .getByRole("button", {
        name: /test/i,
      })
      .click()
  })

  expect(screen.getByText("titles2")).toBeVisible()
})

/*test("Compare Card Information Change", async () => {
  render(
    <Compare_Card
      initialTitle={mockCardProps.initialTitle}
      initialDescription={mockCardProps.initialDescription}
      initialData={mockCardProps.initialData}
      titles={mockCardProps.titles}
      allData={mockCardProps.allData}
    />,
  )

  expect(screen.getByText("InitialDescription")).toBeVisible()

  act(() => {
    screen
      .getByRole("button", {
        name: /test/i,
      })
      .click()
  })

  act(() => {
    screen
      .getByRole("menuitem", {
        name: /titles2/i,
      })
      .click()
  })

  expect(screen.getByText("Description2")).toBeVisible()
})
*/
