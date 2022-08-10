const { defineConfig } = require("@vue/cli-service");

let PORT = 4000;
if (process && process.env && process.env.PORT) PORT = process.env.PORT;

const PROXY = "http://localhost:" + PORT;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: PROXY,
  },
  babel: {
    compact: true
  }
});
