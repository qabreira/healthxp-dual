/// <reference types="cypress" />
import students from '../fixtures/students.json'
import studentsPage from '../support/pages/StudentsPage'

describe('alunos', () => {
    it('deve cadastrar um novo aluno', () => {
        const student = students.successfullyRegister

        // cy.task('deleteStudent', student.email)
        cy.deleteStudent(student.email)
        cy.doAdminLogin()

        studentsPage.goToRegister()
        studentsPage.fillFormRegister(student)
        studentsPage.submitRegister()

        studentsPage.popup.checkMessage('Dados cadastrados com sucesso.')
    })

    it('não deve cadastrar aluno com e-mail duplicado', () => {
        const student = students.duplicateEmail

        //cy.task('resetStudent', student)
        cy.resetStudent(student)
        cy.doAdminLogin()

        studentsPage.goToRegister()
        studentsPage.fillFormRegister(student)
        studentsPage.submitRegister()

        studentsPage.popup.checkMessage('O email informado já foi cadastrado!')
    })

    it('deve remover um aluno sem matrícula', () => {
        const student = students.removeRegister

        // cy.task('resetStudent', student)
        cy.resetStudent(student)
        cy.doAdminLogin()

        studentsPage.search(student.name)
        studentsPage.remove(student.email)
        studentsPage.popup.confirmButton('Confirmar')

        studentsPage.popup.checkMessage('Exclusão realizada com sucesso.')
        studentsPage.popup.confirmButton('OK')
    })

    it('verificar as mensagens indicando campos obrigatórios', () => {
        cy.doAdminLogin()
        studentsPage.goToRegister()

        studentsPage.submitRegister()

        studentsPage.requireField('Nome é obrigatório', 'Digite seu nome completo')
        studentsPage.requireField('O email é obrigatório', 'Digite seu endereço de email')
        studentsPage.requireField('A idade é obrigatória', 'Sua Idade')
        studentsPage.requireField('O peso é obrigatório', 'Seu Peso')
        studentsPage.requireField('A altura é obrigatória', 'Sua Altura')
    })

    it('não permitir cadastro de alunos com idade inferior a 16 ou superior a 90 anos', () => {
        const agesNotAllowed = students.agesNotAllowed
        const alert = [
            { message: 'A idade mínima para treinar é 16 anos!' },
            { message: 'A idade máxima para treinar é 90 anos!' }
        ]

        // agesNotAllowed.forEach((student) => {
        //     cy.task('deleteStudent', student.email)
        // })

        cy.doAdminLogin()
        studentsPage.goToRegister()

        agesNotAllowed.forEach((student, i) => {
            studentsPage.fillFormRegister(student)
            studentsPage.submitRegister()

            studentsPage.alertField('Idade', alert[i].message)
        })
    })

    it('permitir o cadastro de alunos com idade de 16 até 90 anos', () => {
        const agesAllowed = students.agesAllowed

        agesAllowed.forEach((student) => {
            // cy.task('deleteStudent', student.email)
            cy.deleteStudent(student.email)
        })

        cy.doAdminLogin()

        agesAllowed.forEach((student) => {
            studentsPage.goToRegister()
            studentsPage.fillFormRegister(student)
            studentsPage.submitRegister()

            studentsPage.popup.checkMessage('Dados cadastrados com sucesso.')
            studentsPage.popup.confirmButton('OK')
        })
    })

    it.skip('não permite cadastrar aluno com peso menor ou igual a zero', () => {
        const weightNotAllowed = students.weightNotAllowed

        weightNotAllowed.forEach((student) => {
            cy.task('deleteStudent', student.email)
        })

        cy.doAdminLogin()
        studentsPage.goToRegister()

        weightNotAllowed.forEach((student) => {
            studentsPage.fillFormRegister(student)
            studentsPage.submitRegister()

            studentsPage.alertField('Peso (em kg)', 'Peso deve ser maior que 0!')
        })
    })

    it.skip('não permite cadastrar aluno com altura menor ou igual a zero', () => {
        const feetTallNotAllowed = students.feetTallNotAllowed

        feetTallNotAllowed.forEach((student) => {
            cy.task('deleteStudent', student.email)
        })

        cy.doAdminLogin()
        studentsPage.goToRegister()

        feetTallNotAllowed.forEach((student) => {
            studentsPage.fillFormRegister(student)
            studentsPage.submitRegister()

            studentsPage.alertField('Altura', 'Altura deve ser maior que 0!')
        })

    })
})