import { faker } from '@faker-js/faker';

describe('US03 - User Management (Admin)', () => {
  let adminSession;

  beforeEach(() => {
    adminSession = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: "true"
    };

    cy.setupUserViaApi(adminSession);
    cy.loginViaApi(adminSession.email, adminSession.password);
    cy.visit('/cadastrarusuarios');
  });

  it('Scenario 1: Successful User Registration (Admin)', () => {
    const newUser = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      senha: faker.internet.password()
    };

    cy.get('#nome').type(newUser.nome);
    cy.get('#email').type(newUser.email);
    cy.get('#password').type(newUser.senha);

    cy.get('#administrador').check();
    cy.get('[data-testid="cadastrar"]').click();

    cy.contains('Cadastro realizado com sucesso').should('be.visible');
  });

  it('Scenario 2: Prevent duplicate user registration', () => {
    const duplicate = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password() 
    };

    cy.request({
      method: 'POST', 
      url: 'https://serverest.dev/usuarios',
      body: {
        nome: duplicate.nome,
        email: duplicate.email,
        password: duplicate.password,
        administrador: "true"
      }
    });

    cy.get('#nome').type(duplicate.nome);
    cy.get('#email').type(duplicate.email);
    cy.get('#password').type(duplicate.password);
    
    cy.get('[data-testid="cadastrar"]').click();

    cy.get('.alert').should('be.visible')
      .and('contain', 'Este email já está sendo usado');
  });

  it('Scenario 3: Promote common user to admin', () => {
    const commonUser = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: "false"
    };

    cy.setupUserViaApi(commonUser);
    cy.visit('/admin/listarusuarios');

    cy.contains('td', commonUser.email)
      .parent()
      .find('.btn-info').click();
      
/*  TO_DO: Descomentar quando o front-end estiver funcional
    cy.get('#administrador').check();
    cy.get('[data-testid="produtos"]').click();

    cy.contains('td', commonUser.email).parent().should('contain', 'true');
*/
  });
});


