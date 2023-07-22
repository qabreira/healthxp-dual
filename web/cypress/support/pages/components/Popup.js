class Popup {
    content(){
        return cy.get('#swal2-content')
    }

    checkAlertMessage(alertMessage) {
        this.content()
            .should('have.text', alertMessage)
            .and('be.visible')
    }

    returnButton() {
        cy.contains('button', 'Voltar').should('be.visible')
            .click()
    }
}
export default new Popup()