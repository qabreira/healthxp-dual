/// <reference types="cypress" />
import users from '../fixtures/users.json'
import loginPage from '../support/pages/LoginPage'
import studentsPage from '../support/pages/StudentsPage'

Cypress.Commands.add('doAdminLogin', () => {
    const user = users.loginSuccess
    loginPage.doLogin(user)
    studentsPage.navbar.loggedInUser(user.name)
})