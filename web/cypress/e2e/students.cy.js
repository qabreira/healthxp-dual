/// <reference types="cypress" />
import students from '../fixtures/students.json'
import studentsPage from '../support/pages/StudentsPage'

describe('alunos', () => {
    it('deve cadastrar um novo aluno', () => {
        const student = students.successfullyRegister

        cy.task('deleteStudent', student.email)

        cy.doAdminLogin()
        studentsPage.goToRegister()
        studentsPage.fillFormRegister(student)
        studentsPage.submitRegister()

        studentsPage.popup.checkAlertMessage(student.expectedMessage)
    })

    it('não deve cadastrar aluno com e-mail duplicado', () => {
        const student = students.duplicateEmail

        cy.task('resetStudent', student)

        cy.doAdminLogin()
        studentsPage.goToRegister()
        studentsPage.fillFormRegister(student)
        studentsPage.submitRegister()

        studentsPage.popup.checkAlertMessage(student.expectedMessage)
    })
})