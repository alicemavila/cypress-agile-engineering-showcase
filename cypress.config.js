const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Aumenta o tempo de espera para elementos (padrão é 4000ms)
    // 10000ms (10s) é o ideal para evitar flakiness em máquinas de CI
    defaultCommandTimeout: 10000, 

    // Configura o Cypress para tentar rodar o teste de novo se ele falhar no CI
    // Isso é excelente para o portfólio, pois mostra que você lida com "flakiness"
    retries: {
      runMode: 2,    // Tenta 2 vezes no GitHub Actions (npx cypress run)
      openMode: 0,   // Não tenta de novo no modo aberto (npx cypress open)
    },

    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true, // Limpa vídeos/prints antigos antes de começar

    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
});