// cypress/e2e/viewHistory.cy.ts
// E2E tests (Ozner Leyva A01742377)
describe("View History", () => {
  it("displays search history correctly", () => {
    cy.visit("/history")
    cy.get(".history-list").should("be.visible")
    cy.get(".history-list-item").first().click()
    cy.get(".history-details").should("be.visible")
  })
})
