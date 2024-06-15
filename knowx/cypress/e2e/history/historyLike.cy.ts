// Test: Check that you can like a history item
// Description: Check if the user can like a history item and be kept on memory
// Test Owner: Roberto García A01284731

describe("Prueba de almacenamiento de dislike en base de datos para historial", () => {
  it("passes", () => {
    // Prepare the database
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.wait(8000)
    cy.visit("http://localhost:3000/")
    cy.wait(8000)
    cy.get("#dropdown-btn-icon").click()
    cy.get("button").contains("History").click()
    cy.wait(10000)

    // Check that the history is loaded
    cy.get("table").should("exist")
    cy.get("td").should("contain", "test")
    cy.get("td").should("contain", "test2")
    cy.get("td").should("contain", "test3")
    // Select bad answer
    cy.get('button[title="action-btn-icon-1"]').click()
    cy.get("#BadAnswer").should("not.have.class", "pointer-events-none")
    cy.get("#BadAnswer").click()
    // Reload window
    cy.reload()
    cy.wait(10000)
    // Check that item is still disliked
    cy.get('button[title="action-btn-icon-1"]').click()
    cy.get("#BadAnswer").should("have.class", "pointer-events-none")
  })
})
describe("Prueba de almacenamiento de like en base de datos para historial", () => {
  it("passes", () => {
    // Prepare the database
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.wait(8000)
    cy.visit("http://localhost:3000/")
    cy.wait(8000)
    cy.get("#dropdown-btn-icon").click()
    cy.get("button").contains("History").click()
    cy.wait(10000)

    // Check that the history is loaded
    cy.get("table").should("exist")
    cy.get("td").should("contain", "test")
    cy.get("td").should("contain", "test2")
    cy.get("td").should("contain", "test3")
    // Select bad answer
    cy.get('button[title="action-btn-icon-1"]').click()
    cy.wait(1000)
    cy.get("#GoodAnswer").should("not.have.class", "pointer-events-none")
    cy.get("#GoodAnswer").click()
    // Reload window
    cy.reload()
    cy.wait(10000)
    // Check that item is still disliked
    cy.get('button[title="action-btn-icon-1"]').click()
    cy.get("#GoodAnswer").should("have.class", "pointer-events-none")
  })
})
