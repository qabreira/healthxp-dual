class Navbar {
    loggedInUser(name) {
        cy.get('.logged-user').should('contain', `Olá, ${name}`)
            .and('be.visible')
    }
}

export default new Navbar()