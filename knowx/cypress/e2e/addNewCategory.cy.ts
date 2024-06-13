// cypress/e2e/addNewCategory.cy.ts
// E2E tests (Sofía Cantú A01571120)

describe("Add New Category", () => {
  it("adds a new category and displays it in the list", () => {
    cy.visit("/dashboard")
    cy.get('input[placeholder="Type new category"]').type("New Category")
    cy.get("button").contains("Add").click()
    cy.get(".category-list").should("contain", "New Category")
  })
})
