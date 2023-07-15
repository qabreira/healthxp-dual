/// <reference types="cypress" />
import users from '../fixtures/users.json'

describe('login', () => {

    it('deve logar com sucesso', () => {
        const user = users.loginSuccess
        cy.doLogin(user)

        cy.get('.logged-user').should('contain', `Olá, ${user.name}`)
            .and('be.visible')
    })

    it('não deve logar com senha incorreta', () => {
        const user = users.wrongPassword
        cy.doLogin(user)

        cy.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com usuário não cadastrado', () => {
        const user = users.unknownUser
        cy.doLogin(user)

        cy.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com email incorreto', () => {
        const user = users.wrongEmail
        cy.doLogin(user)

        cy.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com e-mail em branco', () => {
        const user = users.emptyEmail

        cy.visit('/').title()
            .should('eq', 'Health eXperience | Exclusivo para treinamentos na QAx')

        cy.get('input[name=email]')
            .type(user.email)
            .clear()
            .should('be.visible')
        cy.get('input[name=password]').should('be.visible')
            .type(user.password)

        cy.contains('button', 'Entrar').should('be.visible')
            .click()

        cy.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com a senha em branco', () => {
        const user = users.emptyPassword

        cy.visit('/').title()
            .should('eq', 'Health eXperience | Exclusivo para treinamentos na QAx')

        cy.get('input[name=email]').should('be.visible')
            .type(user.email)
        cy.get('input[name=password]')
            .type(user.password)
            .clear()
            .should('be.visible')

        cy.contains('button', 'Entrar').should('be.visible')
            .click()

        cy.checkAlertMessage(user.alertMessage)
    })
})