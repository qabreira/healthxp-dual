// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// CUSTOM COMMAND PARA REALIZAR OS PASSOS DE LOGON NA APLICAÇÃO
Cypress.Commands.add('doLogin', (user) => {
    cy.visit('/').title()
        .should('eq', 'Health eXperience | Exclusivo para treinamentos na QAx')

    cy.get('input[name=email]').should('be.visible')
        .type(user.email)
    cy.get('input[name=password]').should('be.visible')
        .type(user.password)

    cy.contains('button', 'Entrar').should('be.visible')
        .click()
})

// CUSTOM COMMAND PARA REALIZAR A VERIFICAÇÃO DA MENSAGEM DE ALERTA
Cypress.Commands.add('checkAlertMessage', (alertMessage) => {
    cy.contains('#swal2-content', alertMessage)
        .should('be.visible')
})

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })