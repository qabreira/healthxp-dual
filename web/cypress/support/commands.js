/// <reference types="cypress" />
import users from '../fixtures/users.json'
import login from '../support/pages/LoginPage'
import students from '../support/pages/StudentsPage'

Cypress.Commands.add('doAdminLogin', () => {
    const user = users.loginSuccess
    login.doLogin(user)
    students.loggedInUser(user.name)
})