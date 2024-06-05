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

describe("Login using github", () => {
  // beforeEach(() => {
  //   cy.rewriteHeaders()
  // })
  it("passes", () => {
    cy.visit("http://localhost:3000/auth")

    const username = Cypress.env("GITHUB_USERNAME")
    const password = Cypress.env("GITHUB_PASSWORD")
    const loginUrl = Cypress.env("SITE_NAME") + "/auth"
    const cookieName = Cypress.env("COOKIE_NAME")
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: false,
      logs: true,
      isPopup: true,
      loginSelector: "#provider-button-github",
      postLoginSelector: "#provider-button-github",
      screenshotOnError: true,
      loginSelectorDelay: 2000,
    }

    cy.clearCookies()

    cy.task("GitHubSocialLogin", socialLoginOptions).then((results: any) => {
      results["cookies"].forEach((cookie: any) => {
        if (cookie.domain.includes(cookieName)) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure,
          })
        }
      })
      cy.window().then((window) => {
        Object.keys(results.ssd).forEach((key) =>
          window.sessionStorage.setItem(key, results.ssd[key]),
        )
        Object.keys(results.lsd).forEach((key) =>
          window.localStorage.setItem(key, results.lsd[key]),
        )
      })
    })

    // cy.get("#provider-button-github").click()

    // cy.origin("https://github.com", () => {
    //   cy.get("#login_field").should("exist")

    //   // cy.get("#login_field").type(Cypress.env("GITHUB_USERNAME"))

    //   cy.task("generateOTP", Cypress.env("OTP_SECRET")).then((otp) => {
    //     cy.get("#login_field")
    //       .type(otp as string)
    //       .wait(15000)
    //   })

    //   cy.get("#password").type(Cypress.env("GITHUB_PASSWORD"))

    //   cy.task("proxiedmail").then((proxiedmail) => {})

    // cy.task("generateOTP", Cypress.env("OTP_SECRET")).then((otp) => {
    //   // cy.get('input[name="otp"]').type(otp as string)
    //   cy.get("#password").type(otp as string)
    // })

    // cy.get('input[type="submit"]').click()

    // cy.get('button[name="authorize"]')
    //   .contains("Authorize")
    //   .then((btn) => {
    //     cy.get('button[name="authorize"]').contains("Authorize").click()
    //   })

    // cy.get('text[name="otp"]').then((otp) => {
    //   cy.task("generateOTP", {
    //     secret: Cypress.env("OTP_SECRET"),
    //   }).then((otp) => {
    //     cy.get('input[name="otp"]').type(otp as string)
    //   })
    // })

    // cy.get('button[name="authorize"]').contains("Authorize").click()

    cy.url().should("eq", "http://localhost:3000/dashboard")
  })
})
