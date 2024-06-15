// cypress/e2e/addNewCategory.cy.ts
// E2E tests (Sofía Cantú A01571120)

describe("Make a Search", () => {
  it("passes", () => {
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.wait(8000)
    cy.visit("http://localhost:3000/dashboard")

    // Asegura que el input sea visible antes de interactuar con él
    cy.get('input[placeholder="Search for a topic..."]', { timeout: 10000 })
      .should("be.visible")
      .type("Top New Search")
      .type("{enter}")
  })
})
