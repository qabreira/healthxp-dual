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