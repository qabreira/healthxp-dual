/// <reference types="cypress" />
import users from '../fixtures/users.json'
import loginPage from '../support/pages/LoginPage'
import studentsPage from '../support/pages/StudentsPage'

Cypress.Commands.add('doAdminLogin', () => {
    const user = users.loginSuccess
    loginPage.doLogin(user)
    studentsPage.navbar.loggedInUser(user.name)
})

Cypress.Commands.add('createEnroll', (dataTest) => {
    cy.task('selectStudentId', dataTest.student.email)
        .then(result => {
            cy.request({
                url: `${Cypress.env('api')}/sessions`,
                method: 'POST',
                body: {
                    email: users.loginSuccess.email,
                    password: users.loginSuccess.password
                }
            }).then(response => {
                const payload = {
                    student_id: result.success.rows[0].id,
                    plan_id: dataTest.plan.id,
                    credit_card: '4242'
                }
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