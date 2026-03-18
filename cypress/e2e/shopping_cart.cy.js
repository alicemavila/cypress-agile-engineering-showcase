describe('US04 - Shopping Cart Flow', () => {
  const customer = { 
    nome: 'Cliente QA', 
    email: `client_${Date.now()}@test.com`, 
    senha: '123' 
  };

  beforeEach(() => {
    cy.request('POST', 'https://serverest.dev/usuarios', {
      nome: customer.nome,
      email: customer.email,
      password: customer.senha,
      administrador: "false"
    });

    cy.loginViaApi(customer.email, customer.senha);
    
    cy.visit('https://front.serverest.dev/home');
  });

  it('Scenario 1: Adding product to cart', () => {
    cy.get('.card-title').first().then(($title) => {
      const productName = $title.text();

      cy.get('[data-testid="adicionarCarrinho"]').first().click();

      cy.url().should('include', '/carrinho');
      cy.get('h1').should('contain', 'Carrinho de compras');
      cy.get('.list-group').should('contain', productName);
      cy.get('[data-testid="product-cart-quantity"]').should('contain', '1');
    });
  });

  it('Scenario 2: Clearing the cart', () => {
    cy.get('[data-testid="adicionarCarrinho"]').first().click();
    
    cy.get('[data-testid="limparCarrinho"]').click();

    cy.contains('Seu carrinho está vazio').should('be.visible');
    cy.get('.list-group').should('not.exist');
  });

  it('Scenario 3: Cart persistence (Logout & Login)', () => {
    cy.get('[data-testid="adicionarCarrinho"]').first().click();
    cy.url().should('include', '/carrinho');

    cy.get('[data-testid="logout"]').click();

    cy.get('#email').type(customer.email);
    cy.get('#password').type(customer.senha);
    cy.get('[data-testid="entrar"]').click();

    cy.visit('https://front.serverest.dev/carrinho');
    cy.get('.list-group').should('have.length.at.least', 1);
  });
});