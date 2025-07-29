const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const webpack = require('webpack');
module.exports = defineConfig({
  configureWebpack: {
     plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // el flag que avisa el warning
      }),
    ],
    resolve: {
      alias: {
        "@styles": path.resolve(__dirname, "src/styles"),
        "@env": path.resolve(__dirname, "src/env.js"),
        "@scc": path.resolve(__dirname, "src/modules/egovf-scc"),
        "@sbf": path.resolve(__dirname, "src/modules/egovf-sbf"),
      },
    },
  },
  transpileDependencies: true,
});
