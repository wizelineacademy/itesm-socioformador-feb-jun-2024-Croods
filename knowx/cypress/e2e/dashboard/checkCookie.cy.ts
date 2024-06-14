// Test: Check Cookies get defined
// Description: Check if cookies are defined and have the correct values
// Test Owner: Roberto García

describe("Check Cookies get defined", () => {
  it("passes", () => {
    // Login user and go to dashboard
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.wait(4000)
    cy.visit("http://localhost:3000/")

    // Input query and search
    cy.get("#searchInput").type("test")
    cy.get("#searchButton").click()
    cy.wait(4000)

    cy.url().should("include", "/phase1/")
    cy.getCookie("currentQuery").should("have.property", "value", "test")
  })
})
