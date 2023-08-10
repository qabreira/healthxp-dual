import popup from './components/Popup'

class LoginPage {

    constructor() {
        this.popup = popup
    }

    go() {
        cy.visit(Cypress.env('baseUrl')).title()
            .should('eq', 'Health eXperience | Exclusivo para treinamentos na QAx')
    }

    fillCredentials(user) {
        cy.get('input[name=email]').should('be.visible').clear({ force: true })
            .as('email')

        cy.get('input[name=password]').should('be.visible').clear({ force: true })
            .as('password')

        user.email ? cy.get('@email').type(user.email) : cy.log('empty email')
        user.password ? cy.get('@password').type(user.password) : cy.log('empty pass')
    }

    submit() {
        cy.contains('button', 'Entrar').should('be.visible')
            .click()
    }

    doLogin(user) {
        this.go()
        this.fillCredentials(user)
        this.submit()
    }
}

export default new LoginPage()