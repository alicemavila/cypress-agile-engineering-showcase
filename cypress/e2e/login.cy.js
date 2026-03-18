describe('US01 - User Authentication', () => {
  const user = {
    nome: 'Fulano da Silva',
    email: 'fulano@qa.com',
    senha: 'teste'
  };

  before(() => {
    cy.setupUserViaApi(user);
  });

  beforeEach(() => {
    cy.visit('https://front.serverest.dev/login');
  });

  it('Scenario 1: Successful Login', () => {
    cy.get('#email').type(user.email);
    cy.get('#password').type(user.senha);
    cy.get('[data-testid="entrar"]').click();
    
    cy.url().should('include', '/home');
    cy.get('h1').should('contain', `Bem Vindo`);
  });

  it('Scenario 2: Login with invalid credentials', () => {
    cy.get('#email').type('invalidemail@teste.com');
    cy.get('#password').type('senha123');
    cy.get('[data-testid="entrar"]').click();

    cy.get('.alert').should('be.visible')
      .and('contain', 'Email e/ou senha inválidos');
  });

  it('Scenario 3: Login with empty fields', () => {
    cy.get('[data-testid="entrar"]').click();

    cy.get('.alert').should('have.length', 2); 
    cy.get('.alert').eq(0).should('contain', 'Email é obrigatório');
    cy.get('.alert').eq(1).should('contain', 'Password é obrigatório');
  });

it('Scenario 4: Invalid email format', () => {
    cy.get('#email').type('email_invalido_sem_arroba');
    cy.get('[data-testid="senha"]').type('123456');
    cy.get('[data-testid="entrar"]').click();

    cy.get('#email').should(($input) => {
        const validationMessage = $input[0].validationMessage;
        expect(validationMessage).to.contains('Inclua um "@"');
    });
});
});