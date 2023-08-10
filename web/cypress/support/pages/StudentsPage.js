import popup from './components/Popup'
import navbar from './components/Navbar'

class StudentsPage {

    constructor() {
        this.navbar = navbar
        this.popup = popup
    }

    goToRegister() {
        cy.contains('a', 'Cadastrar').click()
        cy.url().should('eq', `${Cypress.env('baseUrl')}/students/new`)
    }

    fillFormRegister(student) {
        cy.get('input#name', { timeout: 10000 }).should('be.visible').clear()
            .as('name')
        cy.get('input#email').should('be.visible').clear()
            .as('email')
        cy.get('input#age').should('be.visible').clear()
            .as('age')
        cy.get('input#weight').should('be.visible').clear()
            .as('weight')
        cy.get('input#feet_tall').should('be.visible').clear()
            .as('feet_tall')

        cy.get('@name').type(student.name)
        cy.get('@email').type(student.email)
        cy.get('@age').type(student.age)
        cy.get('@weight').type(student.weight)
        cy.get('@feet_tall').type(student.feet_tall)
    }

    submitRegister() {
        cy.contains('button', 'Cadastrar')
            .should('be.visible')
            .click()
    }

    search(name) {
        cy.get('input[placeholder="Buscar por nome"]')
            .should('be.visible')
            .type(name)
    }

    remove(email) {
        cy.contains('tr', email, { timeout: 10000 })
            .find('button')
            .click()
    }

    requireField(text, placeholder) {
        cy.contains(text)
            .should('be.visible')
            .parent()
            .find(`input[placeholder="${placeholder}"]`)
            .should('be.visible')
    }

    alertField(field, text) {
        cy.contains('label', field).should('be.visible')
            .parent()
            .find('span')
            .should('have.text', text)
            .and('be.visible')
    }
}
export default new StudentsPage()