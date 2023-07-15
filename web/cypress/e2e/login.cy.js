/// <reference types="cypress" />
import users from '../fixtures/users.json'

// IMPORTAÇÃO DA CLASSE CRIADA PARA O PADRÃO PAGE OBJECTS
// import LoginPage from '../support/pages/LoginPage'

// IMPORTAÇÃO DA CLASSE CONSTRUÍDA
import login from '../support/pages/LoginPage'

describe('login', () => {

    it('deve logar com sucesso', () => {
        const user = users.loginSuccess

        // CONSTRUINDO A CLASSE PARA UTILIZAR AS FUNÇÕES
        // const login = new LoginPage()

        // UTILIZANDO A FUNÇÃO DA CLASSE PARA SUBSTITUIR CUSTOM COMMANDS
        // login.doLogin(user)

        // CUSTOM COMMAND
        // cy.doLogin(user)

        // MELHORANDO A DESCRIÇÃO DA FUNÇÃO PARA APROVEITAR O CONTEXTO LOGIN
        login.submit(user)

        cy.get('.logged-user').should('contain', `Olá, ${user.name}`)
            .and('be.visible')
    })

    it('não deve logar com senha incorreta', () => {
        const user = users.wrongPassword
        login.submit(user)
        login.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com usuário não cadastrado', () => {
        const user = users.unknownUser
        login.submit(user)
        login.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com email incorreto', () => {
        const user = users.wrongEmail
        login.submit(user)
        login.checkAlertMessage(user.alertMessage)
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

        login.checkAlertMessage(user.alertMessage)
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

        login.checkAlertMessage(user.alertMessage)
    })
})