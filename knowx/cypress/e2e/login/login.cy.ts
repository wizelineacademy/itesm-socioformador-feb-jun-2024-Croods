// E2E login/sign up tests (Diego Gutiérrez A01284841)

// support/index.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    rewriteHeaders(): void
  }
}

// commands.ts
// Origin: https://www.tomoliver.net/posts/cypress-samesite-problem
Cypress.Commands.add("rewriteHeaders", () => {
  cy.intercept("*", (req) =>
    req.on("response", (res) => {
      const setCookies = res.headers["set-cookie"]
      res.headers["set-cookie"] = (
        Array.isArray(setCookies) ? setCookies : [setCookies]
      )
        .filter((x) => x)
        .map((headerContent) =>
          headerContent.replace(
            /samesite=(lax|strict)/gi,
            "secure; samesite=none",
          ),
        )
    }),
  )
})

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

describe("Login using github", () => {
  beforeEach(() => {
    cy.rewriteHeaders()
  })
  it("passes", () => {
    cy.visit("http://localhost:3000/auth")

    cy.get("#provider-button-github").click()

    cy.origin("https://github.com", () => {
      cy.get("#login_field").should("exist")

      cy.get("#login_field").type("")
      cy.get("#password").type("")
      cy.get('input[type="submit"]').click()

      // if (cy.get('button[name="authorize"]').should("exist")) {
      //   cy.get('button[name="authorize"]').contains("Authorize").click()
      // }

      // cy.get('button[name="authorize"]').contains("Authorize").click()
    })

    // cy.url().should("eq", "http://localhost:3000/dashboard")
  })
})
