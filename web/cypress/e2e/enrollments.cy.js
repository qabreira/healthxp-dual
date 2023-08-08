/// <reference types="cypress" />
import enrollments from '../fixtures/enrollments.json'
import enrollmentsPage from '../support/pages/EnrollmentsPage'

describe('matrículas', () => {

    it('deve cadastrar uma matrícula', () => {
        const dataTest = enrollments.create
        // cy.task('resetStudent', dataTest.student)
        cy.resetStudent(dataTest.student)

        cy.doAdminLogin()
        enrollmentsPage.navbar.goToEnroll()
        enrollmentsPage.goToRegister()

        enrollmentsPage.selectItem('student', dataTest.student.name)
        enrollmentsPage.selectItem('plan', dataTest.plan.name)
        enrollmentsPage.fillCard(dataTest.student.name)
        enrollmentsPage.submitForm()

        enrollmentsPage.popup.checkMessage('Matrícula cadastrada com sucesso.')
    })

    it('não deve duplicar matrículas', () => {
        const dataTest = enrollments.duplicate
        // cy.task('resetStudent', dataTest.student)
        cy.resetStudent(dataTest.student)
        cy.createEnroll(dataTest)

        cy.doAdminLogin()
        enrollmentsPage.navbar.goToEnroll()
        enrollmentsPage.goToRegister()

        enrollmentsPage.selectItem('student', dataTest.student.name)
        enrollmentsPage.selectItem('plan', dataTest.plan.name)
        enrollmentsPage.fillCard(dataTest.student.name)
        enrollmentsPage.submitForm()

        enrollmentsPage.popup.checkMessage('O aluno já possui matrícula cadastrada!')
    })
})