Cypress.Commands.add('setupUserViaApi', (user) => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/usuarios',
    failOnStatusCode: false, 
    body: {
      nome: user.nome,
      email: user.email,
      password: user.password, 
      administrador: user.administrador || "true"
    }
  });
});

Cypress.Commands.add('loginViaApi', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    body: { email, password }
  }).then((response) => {
    window.localStorage.setItem('serverest/userToken', response.body.authorization);
  });
});