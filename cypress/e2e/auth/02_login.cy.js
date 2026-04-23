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
    cy.get('h1', { timeout: 10000 }).should('contain', 'Bem Vindo');
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

    cy.get('#email').then(($el) => {
      expect($el[0].checkValidity()).to.be.false;
      expect($el[0].validity.typeMismatch).to.be.true;
    });
  });

  it('Scenario 5: SQL Injection attempt blocked by frontend', () => {
    const maliciousEmail = "test@test.com' OR '1'='1";

    Login.fillForm(maliciousEmail, '123456');
    Login.submit();

    cy.get('#email').then(($el) => {
      expect($el[0].checkValidity()).to.be.false;
    });

    cy.url().should('include', '/login');
  });

it('Scenario 6: SQL Injection via API', () => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    failOnStatusCode: false,
    body: {
      email: "test@test.com' OR 1=1 --",
      password: "123456"
    }
  }).then((response) => {

    expect(response.status).to.be.oneOf([400, 401]);

    expect(response.body).to.not.have.property('authorization');

    if (response.body && response.body.message) {
      expect(response.body.message)
        .to.match(/inválid/i);
    }
  });
})
})