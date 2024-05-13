describe('Auth Redirect', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.url().should('eq', 'http://localhost:3000/auth')
  })
})

describe('Logged out Redirect', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/dashboard')
    cy.url().should('eq', 'http://localhost:3000/auth')
  })
})