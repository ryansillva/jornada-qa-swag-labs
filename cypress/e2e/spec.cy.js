describe('Swag Labs Tests', () => {

  const selectorsList = {
    usernameField: '[name="user-name"]',
    passwordField: '[name="password"]',
    loginButton: '[type="submit"]',
    sectionTitleTopBar: '.product_label',
    wrongCredentialAlert: '[data-test="error"]',
  }

  it('Login valido', () => {
    cy.visit('/v1/index.html')
    cy.get(selectorsList.usernameField).type('standard_user')
    cy.get(selectorsList.passwordField).type('secret_sauce')
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/v1/inventory.html')
    cy.get(selectorsList.sectionTitleTopBar).contains('Products')
  })

  it('Fazendo compras', () => {
    cy.visit('/v1/inventory.html')
    cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
    cy.get(':nth-child(2) > .pricebar > .btn_primary').click()
    cy.get(':nth-child(4) > .pricebar > .btn_primary').click()
    cy.get('.fa-layers-counter').click()
    cy.get('.btn_action').click()
    cy.get('[data-test="firstName"]').type('Ryan')
    cy.get('[data-test="lastName"]').type('Silva')
    cy.get('[data-test="postalCode"]').type('Cittadella, Jardim Guarujá')
    cy.get('.btn_primary').click()
    cy.get('.btn_action').click()
    cy.location('pathname').should('equal', '/v1/checkout-complete.html')
    cy.get('.complete-header').contains('THANK YOU FOR YOUR ORDER')

  })

  it('Login invalido', () => {  //"it.only" é usado para rodar somente este teste" e it.skip é usado para pular
    cy.visit('/v1/index.html')
    cy.get('[data-test="username"]').type('standard_use')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
})