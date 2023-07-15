class LoginPage {
    submit(user) {
        cy.visit('/').title()
            .should('eq', 'Health eXperience | Exclusivo para treinamentos na QAx')

        cy.get('input[name=email]').should('be.visible')
            .type(user.email)
        cy.get('input[name=password]').should('be.visible')
            .type(user.password)

        cy.contains('button', 'Entrar').should('be.visible')
            .click()
    }

    checkAlertMessage(alertMessage) {
        cy.contains('#swal2-content', alertMessage)
            .should('be.visible')
    }
}

// EXPORTAÇÃO DA CLASSE PARA POSSIBILTAR UTILIZAÇÃO
// export default LoginPage

// EXPORTANDO A CLASSE EM UM FORMATO JÁ CONSTRUÍDO
export default new LoginPage()