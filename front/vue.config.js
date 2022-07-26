const { defineConfig } = require("@vue/cli-service");

const PROXY = "http://localhost:" + process.env.PORT || 4000;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: PROXY,
  },
});
