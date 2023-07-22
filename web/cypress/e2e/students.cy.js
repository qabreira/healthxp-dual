/// <reference types="cypress" />
import students from '../fixtures/students.json'
//import students from '../support/pages/StudentsPage'

describe('students', () => {
    it('deve cadastrar um novo aluno', () => {
        const student = students.successfullyCreate

        // CHAMA A TASK CRIADA EM CYPRESS.CONFIG PARA A EXCLUSÃO DE UM ALUNO
        cy.task('deleteStudent', student.email)

        cy.doAdminLogin()

        cy.contains('a', 'Cadastrar').click()
        cy.url().should('eq', `${Cypress.env('url')}/students/new`)
       
        cy.get('input#name').type(student.name)
        cy.get('input#email').type(student.email)
        cy.get('input#age').type(student.age)
        cy.get('input#weight').type(student.weight)
        cy.get('input#feet_tall').type(student.feet_tall)
        cy.contains('button', 'Cadastrar')
            .should('be.visible')
            .click()
    })
})