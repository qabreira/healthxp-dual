/// <reference types="cypress" />
import users from '../fixtures/users.json'
import login from '../support/pages/LoginPage'
import students from '../support/pages/StudentsPage'

describe('login', () => {

    it('deve logar com sucesso', () => {
        const user = users.loginSuccess
        login.doLogin(user)
        students.loggedInUser(user.name)
    })

    it('não deve logar com senha incorreta', () => {
        const user = users.wrongPassword
        login.doLogin(user)
        login.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com usuário não cadastrado', () => {
        const user = users.unknownUser
        login.doLogin(user)
        login.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com email incorreto', () => {
        const emails = users.wrongEmail.emails
        const alertMessage = users.wrongEmail.alertMessage
        let outputMessages = []
        let expectedMessages = []

        login.go()
        emails.forEach((i) => {
            login.fillCredentials(i)
            login.submit()
            login.popUpMessage()
                .invoke('text')
                .then((text) => {
                    cy.log(text)
                    outputMessages.push(text)
                    expectedMessages.push(alertMessage)
                })
            login.returnCredentials()
        })
        cy.wrap(outputMessages).should('deep.equal', expectedMessages)
    })

    it('não deve logar com e-mail em branco', () => {
        const user = users.emptyEmail
        login.go()
        login.skipFillEmail(user)
        login.submit()
        login.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com a senha em branco', () => {
        const user = users.emptyPassword
        login.go()
        login.skipFillPassword(user)
        login.submit()
        login.checkAlertMessage(user.alertMessage)
    })
})