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
    cy.request({
        url: `${Cypress.env('helper')}/enrolls`,
        method: 'POST',
        body: {
            email: dataTest.student.email,
            plan_id: dataTest.plan.id,
            price: dataTest.plan.price
        }
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('resetStudent', (student) => {
    cy.request({
        url: `${Cypress.env('helper')}/students`,
        method: 'POST',
        body: student
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('deleteStudent', (studentEmail) => {
    cy.request({
        url: `${Cypress.env('helper')}/students/${studentEmail}`,
        method: 'DELETE'
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})