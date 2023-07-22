import popup from './components/Popup'

class LoginPage {

    constructor(){
        this.popup = popup
    }

    go() {
        cy.visit('/').title()
            .should('eq', 'Health eXperience | Exclusivo para treinamentos na QAx')
    }

    fillCredentials(user) {
        cy.get('input[name=email]').should('be.visible')
            .clear()
            .type(user.email)
        cy.get('input[name=password]').should('be.visible')
            .clear()
            .type(user.password)
    }

    skipFillEmail(user) {
        cy.get('input[name=email]')
            .type(user.email)
            .clear()
            .should('be.visible')
        cy.get('input[name=password]').should('be.visible')
            .type(user.password)
    }

    skipFillPassword(user) {
        cy.get('input[name=email]').should('be.visible')
            .type(user.email)
        cy.get('input[name=password]')
            .type(user.password)
            .clear()
            .should('be.visible')
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