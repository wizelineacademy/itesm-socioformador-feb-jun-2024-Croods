//Test for the render and functionality of the history component - Carolina González A01284948
import { test, expect, vi } from "vitest"
import { screen, render } from "@testing-library/react"
import { mockHistoryTest } from "../mocks/mock"
import { act } from "react"
import InputBar from "@/components/Dashboard/InputBar"
import { fireEvent } from "@testing-library/react"

const mockLink = vi.fn()

const mockRouter = {
  push: vi.fn(),
}
vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}))

vi.mock("@/actions/redirect", () => ({
  navigate: (url: string) => mockLink(url),
}))

vi.mock("@/actions/search", () => ({
  initialSearchAction: async (query: string) => {
    return query
  },
  clearSearches: () => {},
}))

test("Render History and Search PopUp Test", async () => {
  render(<InputBar history={mockHistoryTest} />)

  fireEvent.change(screen.getByPlaceholderText("Search for a topic..."), {
    target: { value: "test" },
  })

  act(() => {
    screen.getByRole("listitem", { name: "" }).click()
  })

  expect(screen.getByText("Historial")).toBeInTheDocument()
  expect(screen.getByText("Nueva busqueda")).toBeInTheDocument()
})

test("Search History Click Test", async () => {
  render(<InputBar history={mockHistoryTest} />)

  fireEvent.change(screen.getByPlaceholderText("Search for a topic..."), {
    target: { value: "test" },
  })

  act(() => {
    screen.getByRole("listitem", { name: "" }).click()
  })

  act(() => {
    screen.getByText("Historial").click()
  })

  expect(mockRouter.push).toHaveBeenCalledWith("/history/1")
})
test("New Search Click Test", async () => {
  render(<InputBar history={mockHistoryTest} />)

  fireEvent.change(screen.getByPlaceholderText("Search for a topic..."), {
    target: { value: "test" },
  })

  act(() => {
    screen.getByRole("listitem", { name: "" }).click()
  })

  act(() => {
    screen.getByText("Nueva busqueda").click()
  })

  expect(mockLink).toHaveBeenCalledWith("test")
})
