// cypress/e2e/searchFunctionality.cy.ts
// E2E tests (Ozner Leyva A01742377)
describe("Search Functionality", () => {
  it("searches and displays results", () => {
    cy.visit("/dashboard")
    cy.get('input[name="search"]').type("test search{enter}")
    cy.get(".search-results").should("contain", "test search")
  })
})
