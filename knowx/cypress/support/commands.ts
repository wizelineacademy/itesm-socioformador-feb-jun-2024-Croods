// / <reference types="cypress" />

import hkdf from "@panva/hkdf"
import { EncryptJWT, JWTPayload } from "jose"

declare global {
  namespace Cypress {
    interface Chainable {
      rewriteHeaders(): void
      login(): void
    }
  }
}

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

async function getDerivedEncryptionKey(secret: string) {
  return await hkdf(
    "sha256",
    secret,
    "",
    "NextAuth.js Generated Encryption Key",
    32,
  )
}

export async function encode(
  token: JWTPayload,
  secret: string,
): Promise<string> {
  const maxAge = 30 * 24 * 60 * 60
  const encryptionSecret = await getDerivedEncryptionKey(secret)
  return await new EncryptJWT(token)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(Math.round(Date.now() / 1000 + maxAge))
    .setJti("test")
    .encrypt(encryptionSecret)
}

Cypress.Commands.add("login", () => {
  const payload = {
    name: "Testing",
    email: "test@gmail.com",
    picture: "https://avatars.githubusercontent.com/u/65473367?v=",
    iat: new Date().getTime(),
    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
  }

  cy.wrap(null)
    .then(() => {
      return encode(payload, Cypress.env("NEXTAUTH_SECRET"))
    })
    .then((encryptedToken) =>
      cy.setCookie("next-auth.session-token", encryptedToken, {
        expiry: new Date().setDate(new Date().getDate() + 2),
        path: "/",
        sameSite: "lax",
      }),
    )
})
