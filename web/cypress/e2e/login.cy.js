/// <reference types="cypress" />
import users from '../fixtures/users.json'
import loginPage from '../support/pages/LoginPage'
import studentsPage from '../support/pages/StudentsPage'

describe('login', () => {

    it('deve logar com sucesso', () => {
        const user = users.loginSuccess

        loginPage.doLogin(user)
        studentsPage.navbar.loggedInUser(user.name)
    })

    it('não deve logar com senha incorreta', () => {
        const user = users.wrongPassword

        loginPage.doLogin(user)
        loginPage.popup.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com usuário não cadastrado', () => {
        const user = users.unknownUser

        loginPage.doLogin(user)
        loginPage.popup.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com email incorreto', () => {
        const emails = users.wrongEmail.emails
        const alertMessage = users.wrongEmail.alertMessage
        let outputMessages = []
        let expectedMessages = []

        loginPage.go()
        emails.forEach((i) => {
            loginPage.fillCredentials(i)
            loginPage.submit()
            loginPage.popup.content()
                .invoke('text')
                .then((text) => {
                    cy.log(text)
                    outputMessages.push(text)
                    expectedMessages.push(alertMessage)
                })
            loginPage.popup.returnButton()
        })
        cy.wrap(outputMessages).should('deep.equal', expectedMessages)
    })

    it('não deve logar com e-mail em branco', () => {
        const user = users.emptyEmail

        loginPage.go()
        loginPage.skipFillEmail(user)
        loginPage.submit()
        loginPage.popup.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com a senha em branco', () => {
        const user = users.emptyPassword
        
        loginPage.go()
        loginPage.skipFillPassword(user)
        loginPage.submit()
        loginPage.popup.checkAlertMessage(user.alertMessage)
    })
})