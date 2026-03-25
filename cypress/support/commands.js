Cypress.Commands.add('setupUserViaApi', (user) => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/usuarios',
    body: {
      nome: user.nome,
      email: user.email,
      password: user.senha,
      administrador: "true"
    },
    failOnStatusCode: false 
  });

});

Cypress.Commands.add('loginViaApi', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    body: { 
      email: email, 
      password: password 
    }
  }).then((response) => {
    window.localStorage.setItem('serverest/userToken', response.body.authorization);
  });
});