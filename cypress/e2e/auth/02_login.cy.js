import Login from '../../support/pages/login.page';

describe('US01 - User Authentication', () => {
  const user = {
    nome: Cypress.env('userName') || 'Fulano da Silva',
    email: Cypress.env('userEmail') || 'fulano@qa.com',
    senha: Cypress.env('userPassword') || 'teste'
  };

  before(() => {
    cy.setupUserViaApi(user);
  });

  beforeEach(() => {
    Login.visit();
  });

  it('Scenario 1: Successful Login', () => {
    Login.fillForm(user.email, user.senha);
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

    Login.getErrorMessage().should('have.length', 2); 
    Login.getErrorMessage().first().should('contain', 'Email é obrigatório');
  });

  it('Scenario 4: Invalid email format', () => {
    Login.fillForm('email_sem_arroba', '123456');
    Login.submit();

    cy.get('#email', { timeout: 10000 }).invoke('prop', 'validationMessage')
      .should('contain', 'Inclua um "@"');
  });
});