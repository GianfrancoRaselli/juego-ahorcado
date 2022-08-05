const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000",
    chromeWebSecurity: false,
    specPattern: "**/*.feature",
    supportFile: false,
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
  },
});
