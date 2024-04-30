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

    // const database = new sst.aws.Postgres("KnowXDB", {
    //   scaling: {
    //     min: "2 ACU",
    //     max: "2 ACU"
    //   }
    // });

    new sst.aws.Nextjs("KnowXApp", {
      link: [DB_URL, API_ROOT_ROUTE, NEXTAUTH_URL, NEXTAUTH_SECRET, GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET],
      environment : {
        DB_URL: DB_URL.value,
        API_ROOT_ROUTE: API_ROOT_ROUTE.value,
        NEXTAUTH_URL: NEXTAUTH_URL.value,
        NEXTAUTH_SECRET: NEXTAUTH_SECRET.value,
        GITHUB_ID: GITHUB_ID.value,
        GITHUB_SECRET: GITHUB_SECRET.value,
        GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID.value,
        GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET.value
      }
    });
  },
});
