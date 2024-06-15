import { defineConfig } from "cypress"
import { config } from "dotenv"
config({ path: ".env" })
const { GitHubSocialLogin } = require("cypress-social-logins").plugins

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    defaultCommandTimeout: 10000,
  },

  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        generateOTP: require("cypress-otp"),
        GitHubSocialLogin: GitHubSocialLogin,
      })
    },
  },

  env: {
    GITHUB_USERNAME: process.env.EMAIL_FROM,
    GITHUB_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    COOKIE_NAME: "next-auth.session-token",
    SITE_NAME: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
})
