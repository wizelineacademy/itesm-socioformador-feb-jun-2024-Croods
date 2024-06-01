import BubbleText from "./BubbleText"

describe("BubbleText", () => {
  it("mounts", () => {
    cy.mount(<BubbleText text="Hello" />)
  })
})
