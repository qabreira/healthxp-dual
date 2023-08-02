/// <reference types="cypress" />
import enrollments from '../fixtures/enrollments.json'
import enrollmentsPage from '../support/pages/EnrollmentsPage'

describe('matrículas', () => {

    it('deve cadastrar uma matrícula', () => {
        const dataTest = enrollments.create
        cy.task('resetStudent', dataTest.student)

        cy.doAdminLogin()
        enrollmentsPage.navbar.goToEnroll()
        enrollmentsPage.goToRegister()

        enrollmentsPage.selectItem('student', dataTest.student.name)
        enrollmentsPage.selectItem('plan', dataTest.plan)
        enrollmentsPage.fillCard(dataTest.student.name)
        enrollmentsPage.submitForm()

        enrollmentsPage.popup.checkMessage('Matrícula cadastrada com sucesso.')
    })

    it.only('não deve duplicar matrículas', () => {
        const dataTest = enrollments.duplicate

        cy.task('resetStudent', dataTest.student)

        // EFETUANDO UMA MATRÍCULA VIA API
        cy.task('selectStudentId', dataTest.student.email)
            .then(result => {
                // FAZER O LOGIN PARA OBTER O TOKEN
                cy.request({
                    url: `${Cypress.env('api')}/sessions`,
                    method: 'POST',
                    body: {
                        email: 'admin@healthxp.com',
                        password: 'xperience'
                    }
                }).then(response => {

                    // DEFININDO O CORPO DA REQUISIÇÃO COM AS INFORMAÇÕES NECESSÁRIAS
                    const payload = {
                        student_id: result.success.rows[0].id,
                        plan_id: dataTest.plan.id,
                        credit_card: '4242'
                    }

                    // CONSTRUINDO A REQUISIÇÃO QUE CADASTRA A MATRÍCULA
                    cy.request({
                        url: `${Cypress.env('api')}/enrollments`,
                        method: 'POST',
                        body: payload,
                        headers: {
                            Authorization: `Bearer ${response.body.token}`
                        }
                    }).then(response => {
                        expect(response.status).to.eq(201)
                    })
                })
            })
    })
})