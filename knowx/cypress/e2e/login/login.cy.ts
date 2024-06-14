// E2E login/redirect tests (Diego Gutiérrez A01284841)

describe("Auth Redirect", () => {
  it("passes", () => {
    // Check if the user is redirected to the auth page when trying to access other pages
    cy.visit("http://localhost:3000")
    cy.url().should("eq", "http://localhost:3000/auth")

    // Check if all routes redirect to the auth page
    cy.visit("http://localhost:3000/dashboard").wait(1000)
    cy.url().should("eq", "http://localhost:3000/auth")

    // cy.visit("http://localhost:3000/history").wait(1000)
    // cy.url().should("eq", "http://localhost:3000/auth")
  })
})

describe("Authorization Check", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/auth")
    cy.wait(8000)
    cy.login()
    cy.wait(8000)
    cy.visit("http://localhost:3000/dashboard")
    cy.wait(8000)
    cy.url().should("eq", "http://localhost:3000/dashboard")
  })
})
