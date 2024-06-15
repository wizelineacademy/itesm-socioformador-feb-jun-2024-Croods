// Diego Gutiérrez - A01284841

import InfoComponent from "@/components/informational/InfoComponent"
import { test, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import { act } from "react"

test("Info Component Simple Render Test", async () => {
  render(
    <InfoComponent title="" icon={1}>
      <>
        <p>Info Component</p>
        <p>This is a test 1</p>
        <p>This is a test 2</p>
      </>
    </InfoComponent>,
  )

  const paragraph = screen.queryByText("Info Component")
  expect(paragraph).toBeNull()

  const paragraph2 = screen.queryByText("This is a test 1")
  expect(paragraph2).toBeNull()

  const paragraph3 = screen.queryByText("This is a test 2")
  expect(paragraph3).toBeNull()
})

test("Info Component Action Test", async () => {
  render(
    <InfoComponent title="" icon={1}>
      <>
        <p>Info Component</p>
        <p>This is a test 1</p>
        <p>This is a test 2</p>
      </>
    </InfoComponent>,
  )

  act(() => {
    screen.getByRole("button").click()
  })

  // Check if the correct elements are rendered
  expect(screen.getByText("Info Component")).toBeDefined()
  expect(screen.getByText("This is a test 1")).toBeDefined()
  expect(screen.getByText("This is a test 2")).toBeDefined()

  act(() => {
    screen.getAllByRole("button")[0].click()
  })

  // Check the elements are not rendered after the button is clicked
  expect(screen.queryByText("Info Component")).not.toBeVisible()
  expect(screen.queryByText("This is a test 1")).not.toBeVisible()
  expect(screen.queryByText("This is a test 2")).not.toBeVisible()
})
