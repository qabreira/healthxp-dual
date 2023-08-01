class Navbar {
    loggedInUser(name) {
        cy.get('.logged-user').should('contain', `Olá, ${name}`)
            .and('be.visible')
    }

    goToEnroll() {
        cy.contains('a', '/matrículas')
            .should('be.visible').click()
        cy.url().should('eq', `${Cypress.env('url')}/enrollments`)
    }
}

export default new Navbar()