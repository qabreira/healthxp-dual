import navbar from './components/Navbar'
import popup from './components/Popup'

class EnrollmentsPage {
    constructor() {
        this.navbar = navbar
        this.popup = popup
    }
    goToRegister() {
        cy.contains('a', 'Cadastrar').click()
        cy.url().should('eq', `${Cypress.env('baseUrl')}/enrollments/new`)
    }

    selectItem(item, value) {
        cy.get(`.select_${item}`).click()
        cy.get(`input[aria-label="select_${item}"]`).type(value)

        cy.contains('div[id*="option"]', value)
            .should('be.visible').click()
    }

    fillCard(studentName) {
        cy.get('#card_number').type('4242424242424242')
        cy.get('#card_holder').type(studentName)
        cy.get('#card_month').type('12')
        cy.get('#card_year').type('2030')
        cy.get('#card_cvv').type('123')
    }

    submitForm() {
        cy.contains('button', 'Cadastrar').click()
    }
}

export default new EnrollmentsPage()