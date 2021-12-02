const Login = require ('../integration/pageObjects/login');

describe('Login form', () => {
  
  const user = {
    username: 'Test',
    password: 'Test@123'
  };
  
  const login = new Login();
  
  beforeEach(() => {
    cy.visit('https://www.pecodesoftware.com/qa-portal/registerlogin/registerlogin.php');
    });

  // Verify that all the elements are present on the page
  it('should verify all the elements are present on the page', () => {
  cy.get('[class="wrapper"]')
  .should('exist');

  cy.get('#logomini')
  .should('exist');

  cy.contains('h1', 'QA Portal Login')
  .should('be.visible');

  cy.get('[action="/qa-portal/registerlogin/registerlogin.php"]')
  .should('be.visible');

  cy.get('[placeholder="Username"]')
  .should('be.visible');

  cy.get('[placeholder="Password"]')
  .should('be.visible');

  cy.get('[class="btn btn-success"]')
  .should('exist');

  cy.contains('[class="btn btn-success"]', 'Login')
  .should('be.visible');
});

  // message: No account found with that username.' after input wrong username
  it("should return 'No account found with that username.' after input wrong username", () => {
    
    login.username().type('Tested');

    login.password().type(user.password);

    login.username().should('have.value', 'Tested');

    login.password().should('have.value', 'Test@123')

    login.loginButton().click({ force: true });

    cy.contains('[class="help-block"]', 'No account found with that username.')
    .should('exist');
  });

  // message: The password you entered was not valid.
  it("should return 'The password you entered was not valid.' after input wrong password", () => {
    
    login.username().type(user.username);

    login.password().type(user.password);

    login.username().should('have.value', 'Test');

    login.password().should('have.value', 'Test@123')

    login.loginButton().click({ force: true });

  cy.contains('[class="help-block"]', 'The password you entered was not valid.')
  .should('exist');
  });

  // message: Please enter username.

  it("should return 'Please enter username.' with empty username field", () => {
      
    login.password().type(user.password);
  
    login.username().should('not.have.value');
  
    login.password().should('have.value', 'Test@123')
  
    login.loginButton().click({ force: true });
  
  cy.contains('[class="help-block"]', 'Please enter username.')
  .should('exist');
  });

  // message: Please enter your password.

  it("should return 'Please enter your password.' with empty password field", () => {
      
    login.username().type(user.username);
    
    login.username().should('have.value', 'Test');
    
    login.password().should('not.have.value')
    
    login.loginButton().click({ force: true });
    
  cy.contains('[class="help-block"]', 'Please enter your password.')
  .should('exist');
  });

  // message: Please enter username. Please enter your password.

  it("should return 'Please enter username.' and 'Please enter your password.' with empty all fields", () => {
        
    login.username().should('not.have.value');
        
    login.password().should('not.have.value')
        
    login.loginButton().click({ force: true });
        
  cy.contains('[class="help-block"]', 'Please enter username.')
  .should('exist');
  });

  // Create a test-case that will fail because of unsuccessful login. 
  it("should redirect into '/profile' page", () => {
    
    login.username().type('Tested');

    login.password().type(user.password);

    login.username().should('have.value', 'Tested');

    login.password().should('have.value', 'Test@123')

    login.loginButton().click({ force: true });

  cy.url()
  .should('eq', 'https://www.pecodesoftware.com/qa-portal/profile');
  });

});