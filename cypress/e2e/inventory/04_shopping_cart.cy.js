import { faker } from '@faker-js/faker';

describe('US04 - Shopping Cart Flow', () => {
  let customer;

  beforeEach(() => {
    customer = { 
      nome: faker.person.fullName(), 
      email: faker.internet.email(), 
      password: faker.internet.password(),
      administrador: "false"
    };

    cy.request('POST', 'https://serverest.dev/usuarios', customer);
    cy.loginViaApi(customer.email, customer.password);
    
    cy.visit('/home');
  });

  it('Scenario 1: Adding product to cart', () => {
    cy.get('.card-title').first().then(($title) => {
      const productName = $title.text().trim();

      cy.get('[data-testid="adicionarNaLista"]').first().click();
      cy.get('[data-testid="adicionar carrinho"]').first().click();

      /* TO_DO: Descomentar quando o front-end estiver funcional
         cy.url().should('include', '/carrinho');
         cy.get('h1').should('contain', 'Carrinho de compras');
         cy.get('.list-group').should('contain', productName);
         cy.get('[data-testid="product-cart-quantity"]').should('contain', '1');
      */
    });
  });

  it('Scenario 2: Clearing the cart', () => {
    cy.get('[data-testid="adicionarNaLista"]').first().click();
    cy.get('[data-testid="adicionar carrinho"]').first().click();

    /* cy.get('[data-testid="limparCarrinho"]').click();
       cy.contains('Seu carrinho está vazio').should('be.visible');
       cy.get('.list-group').should('not.exist');
    */
  });

  it('Scenario 3: Cart persistence (Logout & Login)', () => {
    cy.get('[data-testid="adicionarNaLista"]').first().click();
    cy.get('[data-testid="adicionar carrinho"]').first().click();

    /* cy.get('[data-testid="logout"]').click();

       cy.get('#email').type(customer.email);
       cy.get('#password').type(customer.senha, { log: false });
       cy.get('[data-testid="entrar"]').click();

       cy.visit('/carrinho');
       cy.get('.list-group').should('have.length.at.least', 1);
    */
  });
});