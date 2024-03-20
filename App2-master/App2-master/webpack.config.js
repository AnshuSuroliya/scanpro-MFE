const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "remoteapp2",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },

      // For remotes (please adjust)
      name: "remoteapp2",
      filename: "remoteEntry.js",
      exposes: {
        "./homeModule": ".//src/app/home/home.module.ts",
        "./authModule":".//src/app/auth-page/auth-page.module.ts",
        "./resetModule":".//src/app/reset-password/reset-password.module.ts",
        "./emailModule":".//src/app/email-verification/email-verification.module.ts",
        // "./adminModule":".//src/app/admin-dashboard/admin-dashboard.module.ts",
        // "./editModule":".//src/app/edit-profile-page/edit-profile-page.module.ts",
        // "./sideModule":".//src/app/side-menu/side-menu.module.ts",
        // "./userModule":".//src/app/user-details/user-details.module.ts",
        // "./userManageModule":".//src/app/user-management-page/user-management-page.module.ts",
      },

      // For hosts (please adjust)
      // remotes: {
      //     "mfe1": "http://localhost:3000/remoteEntry.js",

      // },

      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },

        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
