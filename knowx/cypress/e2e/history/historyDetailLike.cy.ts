// Test: Check that you can like a history item
// Description: Check if the user can like a history item and be kept on memory inside of the Overview page
// Test Owner: Roberto García A01284731

describe("Prueba de almacenamiento de like en base de datos para historial en página de detalles", () => {
  it("passes", () => {
    // Prepare the database
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.wait(8000)
    cy.visit("http://localhost:3000/")
    cy.get("#dropdown-btn-icon").click()
    cy.get("button").contains("History").click()
    cy.wait(10000)

    // Check that the history is loaded
    cy.get("table").should("exist")
    cy.get("td").should("contain", "test")
    cy.get("td").should("contain", "test2")
    cy.get("td").should("contain", "test3")
    // Select item
    cy.get("td").contains("test").click()
    cy.wait(10000)
    cy.get("#GoodAnswer").should("not.have.class", "text-primary")
    cy.get("#GoodAnswer").click()
    // Reload window
    // cy.reload()
    // cy.wait(10000)
    // Check that item is still liked
    cy.get("#GoodAnswer").should("have.class", "text-primary")
    cy.go("back")
    cy.wait(10000)
    // Check that item is still liked
    cy.get('button[title="action-btn-icon-1"]').click()
    cy.get("#GoodAnswer").should("have.class", "pointer-events-none")
  })
})
describe("Prueba de almacenamiento de dislike en base de datos para historial en página de detalles", () => {
  it("passes", () => {
    // Prepare the database
    cy.request("http://localhost:3000/api/testing")
    cy.login()
    cy.wait(8000)
    cy.visit("http://localhost:3000/")
    cy.get("#dropdown-btn-icon").click()
    cy.get("button").contains("History").click()
    cy.wait(10000)

    // Check that the history is loaded
    cy.get("table").should("exist")
    cy.get("td").should("contain", "test")
    cy.get("td").should("contain", "test2")
    cy.get("td").should("contain", "test3")
    // Select item
    cy.get("td").contains("test").click()
    cy.wait(10000)
    cy.get("#BadAnswer").should("not.have.class", "text-warning")
    cy.get("#BadAnswer").click()
    // Reload window
    // cy.reload()
    // cy.wait(10000)
    // Check that item is still liked
    cy.get("#BadAnswer").should("have.class", "text-warning")
    cy.go("back")
    cy.wait(10000)
    // Check that item is still liked
    cy.get('button[title="action-btn-icon-1"]').click()
    cy.get("#BadAnswer").should("have.class", "pointer-events-none")
  })
})

// z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small gap-2 [&:not(:first-child):not(:last-child)]:rounded-none px-0 !gap-0 transition-transform-colors-opacity motion-reduce:transition-none bg-default rounded-none first:rounded-s-medium last:rounded-e-medium min-w-10 w-10 h-10 data-[hover=true]:opacity-hover text-primary
