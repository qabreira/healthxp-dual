class Popup {
    content() {
        return cy.get('#swal2-content')
    }

    checkMessage(textMessage) {
        this.content()
            .should('have.text', textMessage)
            .and('be.visible')
    }

    sendResponse(text) {
        cy.get('textarea#answer').type(text)
        cy.contains('button', 'Enviar resposta').click()
    }

    returnButton() {
        cy.contains('button.swal2-cancel', 'Voltar').should('be.visible')
            .click()
    }

    confirmButton(text) {
        cy.contains('button.swal2-confirm', text)
            .should('be.visible')
            .click()
    }

}
export default new Popup()