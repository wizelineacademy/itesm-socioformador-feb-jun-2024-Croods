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
