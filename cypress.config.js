const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "yqqwv4",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl: 'https://qastoredesafio.lojaintegrada.com.br/'
  },
});
