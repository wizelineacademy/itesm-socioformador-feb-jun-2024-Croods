/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "knowx",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const DB_URL = new sst.Secret("DBUrl");
    const API_ROOT_ROUTE = new sst.Secret("APIRootRoute");
    const NEXTAUTH_URL = new sst.Secret("NextAuthUrl");
    const NEXTAUTH_SECRET = new sst.Secret("NextAuthSecret");
    const GITHUB_ID = new sst.Secret("GithubId");
    const GITHUB_SECRET = new sst.Secret("GithubSecret");
    const GOOGLE_CLIENT_ID = new sst.Secret("GoogleClientId");
    const GOOGLE_CLIENT_SECRET = new sst.Secret("GoogleClientSecret");
    const EMAIL_SERVER_HOST = new sst.Secret("EmailServerHost");
    const EMAIL_SERVER_PORT = new sst.Secret("EmailServerPort");
    const EMAIL_SERVER_USER = new sst.Secret("EmailServerUser");
    const EMAIL_SERVER_PASSWORD = new sst.Secret("EmailServerPassword");
    const EMAIL_FROM = new sst.Secret("EmailFrom");
    const SENDGRID_API_KEY = new sst.Secret("SendgridApiKey");

    new sst.aws.Nextjs("KnowXApp", {
      link: [
        DB_URL, 
        API_ROOT_ROUTE, 
        NEXTAUTH_URL, 
        NEXTAUTH_SECRET, 
        GITHUB_ID, 
        GITHUB_SECRET, 
        GOOGLE_CLIENT_ID, 
        GOOGLE_CLIENT_SECRET,
        EMAIL_SERVER_HOST,
        EMAIL_SERVER_PORT,
        EMAIL_SERVER_USER,
        EMAIL_SERVER_PASSWORD,
        EMAIL_FROM,
        SENDGRID_API_KEY
      ],
      environment : {
        DB_URL: DB_URL.value,
        API_ROOT_ROUTE: API_ROOT_ROUTE.value,
        NEXTAUTH_URL: NEXTAUTH_URL.value,
        NEXTAUTH_SECRET: NEXTAUTH_SECRET.value,
        GITHUB_ID: GITHUB_ID.value,
        GITHUB_SECRET: GITHUB_SECRET.value,
        GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID.value,
        GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET.value,
        EMAIL_SERVER_HOST: EMAIL_SERVER_HOST.value,
        EMAIL_SERVER_PORT: EMAIL_SERVER_PORT.value,
        EMAIL_SERVER_USER: EMAIL_SERVER_USER.value,
        EMAIL_SERVER_PASSWORD: EMAIL_SERVER_PASSWORD.value,
        EMAIL_FROM: EMAIL_FROM.value,
        SENDGRID_API_KEY: SENDGRID_API_KEY.value
      }
    });
  },
});
