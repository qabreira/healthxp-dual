import popup from './components/Popup'
import navbar from './components/Navbar'

class StudentsPage {

    constructor() {
        this.navbar = navbar
        this.popup = popup
    }

    goToRegister() {
        cy.contains('a', 'Cadastrar').click()
        cy.url().should('eq', `${Cypress.env('url')}/students/new`)
    }

    fillFormRegister(student) {
        cy.get('input#name', { timeout: 10000 }).type(student.name)
        cy.get('input#email').type(student.email)
        cy.get('input#age').type(student.age)
        cy.get('input#weight').type(student.weight)
        cy.get('input#feet_tall').type(student.feet_tall)
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

    submitAge(age) {
        cy.get('input#age').clear().type(age)
            .should('have.value', age)
        this.submitRegister()
    }

    checkAgeNotAllowed(text) {
        cy.contains(text)
            .should('be.visible')
            .parent()
            .find('input#age')

    }
}
export default new StudentsPage()