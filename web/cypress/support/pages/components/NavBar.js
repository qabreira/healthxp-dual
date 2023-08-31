class Navbar {
    loggedInUser(name) {
        cy.get('.logged-user').should('contain', `Olá, ${name}`)
            .and('be.visible')
    }

    goToEnroll() {
        cy.contains('a', '/matrículas')
            .should('be.visible').click()
        cy.url().should('eq', `${Cypress.env('baseUrl')}/enrollments`)
    }

    checkNotifications(question) {
        cy.get('button').click()
        cy.contains('div', question).should('be.visible')
    }

    openQuestion(question) {
        cy.get('button').click()
        cy.contains('div', question).should('be.visible').click()
    }
}

export default new Navbar()