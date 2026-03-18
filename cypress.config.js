const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    setupNodeEvents(on, config) { }
  },
});