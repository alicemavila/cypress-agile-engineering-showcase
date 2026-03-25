import { faker } from '@faker-js/faker';

describe('US02 - Product Management (CRUD)', () => {
  let admin;

  const generateProduct = () => ({
    nome: `${faker.commerce.productName()} ${faker.string.alphanumeric(3)}`,
    preco: faker.number.int({ min: 10, max: 100 }),
    descricao: faker.commerce.productDescription(),
    quantidade: 10
  });

  beforeEach(() => {
    admin = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: "true"
    };

    cy.setupUserViaApi(admin);
    cy.loginViaApi(admin.email, admin.password);
    cy.visit('/admin/cadastrarprodutos');
  });

  it('Scenario 1: Should register a new product successfully', () => {
    const product = generateProduct();
    
    cy.get('#nome').type(product.nome);
    cy.get('#price').type(product.preco);
    cy.get('#description').type(product.descricao);
    cy.get('#quantity').type(product.quantidade);
    cy.get('[data-testid="imagem"]').selectFile('cypress/fixtures/product_test.png');
    cy.get('[data-testid="cadastarProdutos"]').click();

    cy.url().should('include', '/admin/listarprodutos');
    cy.contains('td', product.nome).should('be.visible');
  });

  it('Scenario 2: Delete product with success', () => {
    const productToDelete = generateProduct();

    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: { Authorization: window.localStorage.getItem('serverest/userToken') },
      body: { 
        nome: productToDelete.nome, 
        preco: productToDelete.preco, 
        descricao: productToDelete.descricao, 
        quantidade: productToDelete.quantidade 
      }
    });

    cy.visit('/admin/listarprodutos');

    cy.contains('td', productToDelete.nome)
      .parent()
      .find('.btn-danger') 
      .click();

    cy.contains(productToDelete.nome).should('not.exist');
  });

  it('Scenario 3: Register product with zero/negative price', () => {
    const product = generateProduct();
    
    cy.get('#nome').type(product.nome);
    cy.get('#price').type('0'); 
    cy.get('#description').type(product.descricao);
    cy.get('#quantity').type(product.quantidade);
    cy.get('[data-testid="cadastarProdutos"]').click();

    cy.get('.alert').should('be.visible')
      .and('contain', 'Preco deve ser um número positivo');
  });
});