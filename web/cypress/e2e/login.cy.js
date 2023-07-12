/// <reference types="cypress" />

describe('login', () => {

    it('deve logar com o perfil do admin', () => {
        const user = {
            email: 'admin@healthxp.com',
            password: 'xperience'
        }

        cy.visit('/').title()
            .should('eq', 'Health eXperience | Exclusivo para treinamentos na QAx')

        cy.get('input[name=email]').should('be.visible')
            .type(user.email)
        cy.get('input[name=password]').should('be.visible')
            .type(user.password)

        cy.contains('button', 'Entrar').should('be.visible')
            .click()

        cy.get('.logged-user').should('contain', "Olá, Admin")
            .and('be.visible')
    })

/*     it.skip('deve fazer login via api request', () => {
        const user = {
            email: 'admin@healthxp.com',
            password: 'xperience'
        }

        cy.request({
            url: 'http://localhost:3333/sessions',
            method: 'POST',
            body: user,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body.token))
        })
    }) */
})