const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    viewportWidth: 1280,
    viewportHeight: 720,
    
    defaultCommandTimeout: 10000, 

    
    retries: {
      runMode: 2,    
      openMode: 0,   
    },

    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true, 

    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
});