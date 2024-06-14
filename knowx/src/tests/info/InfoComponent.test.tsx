// Vitest (Ozner Leyva A01742377)
import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import InfoComponent from "@/components/informational/InfoComponent"

test("InfoComponent renders correctly", () => {
  render(
    <InfoComponent title="Test Title" icon={123}>
      <p>Test Content</p>
    </InfoComponent>,
  )

  expect(screen.getByRole("button")).toBeVisible()
  expect(screen.queryByText("Test Title")).toBeNull()
  expect(screen.queryByText("Test Content")).toBeNull()
})
