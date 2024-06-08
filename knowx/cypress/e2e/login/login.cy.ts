// E2E login/sign up tests (Diego Gutiérrez A01284841)

describe("Auth Redirect", () => {
  it("passes", () => {
    // Check if the user is redirected to the auth page when trying to access other pages
    cy.visit("http://localhost:3000").wait(1000)
    cy.url().should("eq", "http://localhost:3000/auth")

    // Check if all routes redirect to the auth page
    cy.visit("http://localhost:3000/dashboard").wait(1000)
    cy.url().should("eq", "http://localhost:3000/auth")

    // cy.visit("http://localhost:3000/history").wait(1000)
    // cy.url().should("eq", "http://localhost:3000/auth")
  })
})

describe("Authorization Check", () => {
  // beforeEach(() => {
  //   cy.rewriteHeaders()
  // })

  it("passes", () => {
    cy.visit("http://localhost:3000/auth")
    cy.login()
    cy.visit("http://localhost:3000/auth")
    cy.url().should("eq", "http://localhost:3000/dashboard")
  })
})
