// cypress/e2e/viewHistory.cy.ts
// E2E tests (Ozner Leyva A01742377)

describe("View History", () => {
  it("passes", () => {
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.wait(8000)
    cy.visit("http://localhost:3000/history")

    // Verifica que la tabla esté visible
    cy.get("table[aria-label='search history table']").should("be.visible")

    // Verifica que haya al menos un elemento en el historial
    cy.get("tbody > tr").should("have.length.greaterThan", 0)

    // Verifica que la fecha y la hora se formateen correctamente
    cy.get("tbody > tr")
      .first()
      .within(() => {
        cy.get("td")
          .eq(1)
          .contains(/(\d{1,2}\/\d{1,2}\/\d{4})/)
        cy.get("td")
          .eq(2)
          .contains(/(\d{1,2}:\d{2})/)
      })
  })
})
