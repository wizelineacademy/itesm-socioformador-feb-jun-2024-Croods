// Test: Check Cookies get defined
// Description: Check if cookies are defined and have the correct values
// Test Owner: Roberto García

describe("Check Cookies get defined", () => {
  it("passes", () => {
    let originalSearchValues = [] as string[]
    const items = [] as string[]

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

    cy.get("#submitButton").click()
    cy.wait(4000)

    cy.getCookie("originalCategories")
      .should("exist")
      .then((cookie) => {
        const parsedCookie: string = cookie!.value
        cy.log(parsedCookie)
        originalSearchValues = parsedCookie.split("%2C")
        cy.log(originalSearchValues[0])
      })
      .then(() => {
        // cy.wrap(originalSearchValues).should("deep.equal", ["test"])
        // Click on a suggestion
        cy.get("#categoryButton").each((li) => {
          items.push(li.text())
        })
        cy.get("#categoryButton").first().click()
        cy.getCookie("categories").should(
          "have.property",
          "value",
          originalSearchValues[0],
        )
      })
  })
})
