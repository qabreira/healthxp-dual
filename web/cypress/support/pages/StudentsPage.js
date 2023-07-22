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
        cy.get('input#name').type(student.name)
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

}
export default new StudentsPage()