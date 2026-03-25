describe('US02 - Product Management (CRUD)', () => {
  const adminUser = { 
    nome: 'Fulano da Silva', 
    email: 'fulano@qa.com', 
    senha: 'teste' 
  };
  
  const productName = `Produto Agile ${Math.floor(Math.random() * 10000)}`;

  beforeEach(() => {
    cy.setupUserViaApi(adminUser); 
    cy.loginViaApi(adminUser.email, adminUser.senha);
    
    cy.visit('https://front.serverest.dev/admin/cadastrarprodutos');
  });

  it('Scenario 1: Should register a new product successfully', () => {
    cy.get('#nome').type(productName);
    cy.get('#price').type('150');
    cy.get('#description').type('Automação de teste de alta performance');
    cy.get('#quantity').type('10');
    
    cy.get('[data-testid="imagem"]').selectFile('cypress/fixtures/product_test.png');
    cy.get('[data-testid="cadastarProdutos"]').click();

    cy.url().should('include', '/admin/listarprodutos');
    cy.get('table').should('contain', productName);
  });

  it('Scenario 2: Delete product with success', () => {
    const deleteMe = `Delete ${Date.now()}`;
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: { Authorization: window.localStorage.getItem('serverest/userToken') },
      body: { nome: deleteMe, preco: 10, descricao: 'Desc', quantidade: 1 }
    });

    cy.visit('https://front.serverest.dev/admin/listarprodutos');

    cy.contains('td', deleteMe)
      .parent()
      .find('.btn-danger') 
      .click();

    cy.contains(deleteMe).should('not.exist');
    cy.get('.alert').should('not.exist');
  });

  it('Scenario 3: Register product with zero/negative price', () => {
    cy.get('#nome').type('Produto Preço Inválido');
    cy.get('#price').type('0'); 
    cy.get('#description').type('Teste de validação de valor');
    cy.get('#quantity').type('10');
    cy.get('[data-testid="imagem"]').selectFile('cypress/fixtures/product_test.png');
    
    cy.get('[data-testid="cadastarProdutos"]').click();

    cy.get('.alert').should('be.visible')
      .and('contain', 'Preco deve ser um número positivo');
  });

  it('Scenario 4: Register product with empty fields', () => {
    cy.get('[data-testid="cadastarProdutos"]').click();

    cy.get('.alert').should('have.length', 4); 
    
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('Preco é obrigatório').should('be.visible');
    cy.contains('Descricao é obrigatório').should('be.visible');
    cy.contains('Quantidade é obrigatório').should('be.visible');
  });

});