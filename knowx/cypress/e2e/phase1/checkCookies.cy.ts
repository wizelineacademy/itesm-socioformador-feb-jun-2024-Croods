// Test: Check Cookies get defined
// Description: Check if cookies are defined and have the correct values
// Test Owner: Roberto García A01284731

describe("Check Cookies get defined", () => {
  it("passes", () => {
    let originalSearchValues = [] as string[]
    const items = [] as string[]

    // Login user and go to dashboard
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.wait(10000)
    cy.visit("http://localhost:3000/")
    cy.wait(10000)

    // Input query and search
    cy.get("#searchInput").type("test")
    cy.get("#searchButton").click()
    cy.wait(10000)

    cy.url().should("include", "/phase1/")
    cy.getCookie("originalSearchValues")
      .wait(5000)
      .should("exist")
      .wait(5000)
      .then((cookie) => {
        const parsedCookie: string = cookie!.value
        originalSearchValues = parsedCookie.split("%2C")
      })
      .then(() => {
        // cy.wrap(originalSearchValues).should("deep.equal", ["test"])
        // Click on a suggestion
        cy.get("#searchResult").each((li) => {
          items.push(li.text())
          // cy.wait(5000)
        })
        cy.get("#searchResult").first().click()
        cy.wait(10000)
        cy.getCookie("searchValues").should(
          "have.property",
          "value",
          originalSearchValues[0],
        )
      })
  })
})
