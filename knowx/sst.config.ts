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
    const database = new sst.aws.Postgres("KnowXDB", {
      scaling: {
        min: "2 ACU",
        max: "128 ACU"
      }
    });

    new sst.aws.Nextjs("KnowXApp", {
      link: [database]
    });
  },
});
