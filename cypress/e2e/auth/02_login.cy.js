import Login from '../../support/pages/login.page';

describe('US01 - User Authentication', () => {
  const user = {
    nome: Cypress.env('userName'),
    email: Cypress.env('userEmail'),
    password: Cypress.env('userPassword') 
  };

  before(() => {
    cy.setupUserViaApi(user);
  });

  beforeEach(() => {
    Login.visit();
  });

  it('Scenario 1: Successful Login', () => {
    Login.fillForm(user.email, user.password);
    Login.submit();
    
    cy.url().should('include', '/home');
    cy.get('h1', { timeout: 10000 }).should('contain', `Bem Vindo`);
  });

  it('Scenario 2: Login with invalid credentials', () => {
    Login.fillForm('invalido@teste.com', 'senha123');
    Login.submit();

    Login.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Email e/ou senha inválidos');
  });

  it('Scenario 3: Login with empty fields', () => {
    Login.submit();

    Login.getErrorMessage().should('have.length.at.least', 2); 
    Login.getErrorMessage().first().should('contain', 'Email é obrigatório');
  });

  it('Scenario 4: Invalid email format', () => {
    Login.fillForm('email_sem_arroba', '123456');
    Login.submit();

    cy.get('#email')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Inclua um "@"');
  });
});