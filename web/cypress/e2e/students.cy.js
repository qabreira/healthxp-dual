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

        studentsPage.popup.checkMessage('Dados cadastrados com sucesso.')
    })

    it('não deve cadastrar aluno com e-mail duplicado', () => {
        const student = students.duplicateEmail

        cy.task('resetStudent', student)
        cy.doAdminLogin()

        studentsPage.goToRegister()
        studentsPage.fillFormRegister(student)
        studentsPage.submitRegister()

        studentsPage.popup.checkMessage('O email informado já foi cadastrado!')
    })

    it('deve remover um aluno sem matrícula', () => {
        const student = students.removeRegister

        cy.task('resetStudent', student)
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
        const student = {
            name: 'Carlota Corona',
            email: 'carlota@mail.com',
            age: '0',
            weight: '68',
            feet_tall: '1.7',
        }
        const agesNotAllowed = [
            { value: '15', textMessage: 'A idade mínima para treinar é 16 anos!' },
            { value: '91', textMessage: 'A idade máxima para treinar é 90 anos!' }
        ]

        cy.task('deleteStudent', student.email)
        cy.doAdminLogin()
        studentsPage.goToRegister()

        studentsPage.fillFormRegister(student)

        agesNotAllowed.forEach((age) => {
            studentsPage.submitAge(age.value)
            studentsPage.checkAgeNotAllowed(age.textMessage)
        })
    })

    it('permitir o cadastro de alunos com idade de 16 até 90 anos', () => {
        const agesAllowed = students.agesAllowed

        agesAllowed.forEach((student) => {
            cy.task('deleteStudent', student.email)
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

    it('não permite cadastrar aluno com peso menor ou igual a zero', () => {
        const student = {
            name: 'Aluno Peso Incorreto',
            email: 'sempeso@mail.com',
            age: '30',
            weight: '0',
            feet_tall: '1.7',
        }
        const incorrectWeight = [
            { value: '0', textMessage: '' },
            { value: '-0,1', textMessage: '' },
            // { value: '100000000', textMessage: 'Dados atualizados com sucesso.' },
            // { value: '99999999', textMessage: 'Ocorreu um erro na atualização dos dados!' }
        ]

        cy.task('deleteStudent', student.email)
        cy.doAdminLogin()
        studentsPage.goToRegister()

        studentsPage.fillFormRegister(student)

        incorrectWeight.forEach((w) => {
            studentsPage.submitWeight(w.value)
            studentsPage.checkWeightIncorrect(w.textMessage)
        })

    })

    it('não permite cadastrar aluno com altura menor ou igual a zero', () => {
        const student = {
            name: 'Aluno Altura Incorreta',
            email: 'semaltura@mail.com',
            age: '62',
            weight: '100',
            feet_tall: '0',
        }
        const incorrectFeetTall = [
            { value: '0', textMessage: '' },
            { value: '-0,1', textMessage: '' },
            // { value: '100000000', textMessage: 'Dados atualizados com sucesso.' },
            // { value: '99999999', textMessage: 'Ocorreu um erro na atualização dos dados!' }
        ]
        cy.task('deleteStudent', student.email)
        cy.doAdminLogin()
        studentsPage.goToRegister()

        studentsPage.fillFormRegister(student)

        incorrectFeetTall.forEach((ft) => {
            studentsPage.submitFeetTall(ft.value)
            studentsPage.checkFeetTallIncorrect()
        })

    })
})