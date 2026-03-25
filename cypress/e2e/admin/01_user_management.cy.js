describe('US03 - User Management (Admin)', () => {
  const adminUser = { nome: 'Admin System', email: 'admin@qa.com', senha: '123' };

  beforeEach(() => {
    cy.visit('https://front.serverest.dev/cadastrarusuarios');
  });

  it('Scenario 1: Successful User Registration (Admin)', () => {
    const uniqueEmail = `admin_${Date.now()}@test.com`;
    
    cy.get('#nome').type('Novo Admin');
    cy.get('#email').type(uniqueEmail);
    cy.get('#password').type('password123');
    
    cy.get('#administrador').check(); 
    
    cy.get('[data-testid="cadastrar"]').click();

    cy.contains('Cadastro realizado com sucesso').should('be.visible');
    cy.url().should('include', '/admin/home');
  });

  it('Scenario 2: Prevent duplicate user registration', () => {
    const duplicateEmail = 'alice@test.com';

    cy.setupUserViaApi({ nome: 'Alice', email: duplicateEmail, senha: '123' });

    cy.get('#nome').type('Alice Monteiro');
    cy.get('#email').type(duplicateEmail);
    cy.get('#password').type('123456');
    
    cy.get('[data-testid="cadastrar"]').click();

    cy.get('.alert').should('be.visible')
      .and('contain', 'Este email já está sendo usado');
  });

  it('Scenario 3: Promote common user to admin (Logic Check)', () => {
    const emailPromovido = `promovido_${Date.now()}@test.com`;
    
    cy.get('#nome').type('User Promovido');
    cy.get('#email').type(emailPromovido);
    cy.get('#password').type('123');
    
    cy.get('#administrador').check(); 
    cy.get('[data-testid="cadastrar"]').click();

    cy.get('[data-testid="listarUsuarios"]').should('be.visible');
  });
});