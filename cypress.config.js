const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://airportlabs.com',
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      return config;
    }
  }
});