module.exports = {
  e2e: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: true,
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
};


