/// <reference types="cypress" />
import data from '../fixtures/questions.json'
import users from '../fixtures/users.json'
import loginPage from '../support/pages/LoginPage'
import studentsPage from '../support/pages/StudentsPage'

describe('receber perguntas', () => {

    it('recebe notificação com a pergunta de um aluno', () => {
        const dataTest = data.create
        const user = users.loginAdmin

        cy.cleanHelpOrders()
        cy.resetStudent(dataTest.student)
        cy.createEnroll(dataTest)
        cy.createQuestion(dataTest.question)
       
        loginPage.doLogin(user)
        studentsPage.navbar.loggedInUser(user.name)
        studentsPage.navbar.checkNotifications(dataTest.question)
    })

    it('responde a pergunta de um aluno', () => {
        const dataTest = data.response
        const user = users.loginAdmin

        cy.cleanHelpOrders()
        cy.resetStudent(dataTest.student)
        cy.createEnroll(dataTest)
        cy.createQuestion(dataTest.question)
       
        loginPage.doLogin(user)
        studentsPage.navbar.loggedInUser(user.name)
        studentsPage.navbar.openQuestion(dataTest.question)
        studentsPage.popup.sendResponse('até pode, mas não deve!')
        studentsPage.popup.checkMessage('Resposta enviada com sucesso')
    })

})