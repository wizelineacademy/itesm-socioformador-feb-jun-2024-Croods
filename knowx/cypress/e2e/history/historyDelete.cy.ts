// E2E history deletion tests (Diego Gutiérrez A01284841)

describe("History Loading", () => {
  it("passes", () => {
    // Prepare the database
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.visit("http://localhost:3000/")
    cy.get("#dropdown-btn-icon").click()
    cy.get("button").contains("History").click()

    // Check that the history is loaded
    cy.get("table").should("exist")
    cy.get("td").should("contain", "test")
    cy.get("td").should("contain", "test2")
    cy.get("td").should("contain", "test3")

    cy.get("#action-btn-icon").click()
    cy.get("#DeleteButton").click()

    // Check that the history is deleted
    cy.get("table").should("exist")
    cy.get("tr").should("not.equal", "test")

    cy.get("td").should("contain", "test2")
    cy.get("td").should("contain", "test3")
  })
})