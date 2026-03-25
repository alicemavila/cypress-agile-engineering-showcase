class LoginPage {
  visit() {
    cy.visit('https://front.serverest.dev/login');
  }

  fillForm(email, password) {
    if (email) cy.get('#email').type(email);
    if (password) cy.get('#password').type(password);
  }

  submit() {
    cy.get('[data-testid="entrar"]').click();
  }

  getErrorMessage() {
    return cy.get('.alert');
  }
}

export default new LoginPage();