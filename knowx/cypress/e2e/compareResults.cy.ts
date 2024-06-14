// cypress/e2e/compareResults.cy.ts
// E2E tests (Sofía Cantú A01571120)

describe("Compare Results", () => {
  it("navigates to compare page and shows comparison", () => {
    cy.visit("/phase3")
    cy.get("button").contains("Compare").click()
    cy.url().should("include", "/compare")
    cy.get(".comparison-results").should("be.visible")
  })
})
