const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      alias: {
        "@styles": path.resolve(__dirname, "src/styles"),
        "@env": path.resolve(__dirname, "src/env.js"),
      },
    },
  },
  transpileDependencies: true,
});
