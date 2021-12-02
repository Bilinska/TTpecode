class Login{
  username(){
    return cy.get('[name="username"]');
  }
  password(){
    return cy.get('[name="password"]');
  }
  loginButton(){
    return cy.get('[class="btn btn-success"]');
  }
}

module.exports = Login;