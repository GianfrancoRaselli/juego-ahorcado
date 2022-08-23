const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000", // front running port
    chromeWebSecurity: false,
    specPattern: "**/*.feature",
    supportFile: false,
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
    video: false,
    videoCompression: false,
    videoUploadOnPasses: false,
    screenshotOnRunFailure: false,
  },
});
