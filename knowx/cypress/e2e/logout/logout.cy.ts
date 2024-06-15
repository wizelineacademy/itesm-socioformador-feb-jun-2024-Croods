//E2E test for the Log out functionality - Carolina González A01284948
describe("Sign out", () => {
  it("passes", () => {
    // Prepare the database
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.wait(8000)
    cy.visit("http://localhost:3000/")
    cy.wait(8000)
    cy.get("#dropdown-btn-icon").click()
    cy.get("button").contains("Sign out").click()
    cy.wait(8000)

    // Check that the user is logged out
    cy.get("button").should("contain", "Sign in with Email")
    cy.wait(8000)

    cy.visit("http://localhost:3000/")
    cy.wait(8000)
    cy.get("button").should("contain", "Sign in with Email")
  })
})
