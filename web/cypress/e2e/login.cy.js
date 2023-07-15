/// <reference types="cypress" />

// IMPORTAÇÃO DA MASSA DE TESTES EXTERNA USANDO O PRÓPRIO JAVASCRIPT
import user from '../fixtures/users.json'

describe('login', () => {

    // GANCHO DO CYPRESS PARA IMPORTAR A MASSA DE TESTES DE FIXTURES
    // before(function () {
    //     cy.fixture('users.json').then(function (user) {
    //         this.user = user
    //     })
    // })

    it('deve logar com o perfil do admin', function () {
        // MASSA DE TESTE DENTRO DO TESTE
        // const user = {
        //     name: 'Admin',
        //     email: 'admin@healthxp.com',
        //     password: 'xperience'
        // }

        // MASSA DE TESTE EXTERNA IMPORTADA VIA COMANDO DO CYPRESS
        // cy.fixture('users.json').then(function (user) {
        //     cy.log(JSON.stringify(user))
        // })
        //
        // const user = this.user

        cy.visit('/').title()
            .should('eq', 'Health eXperience | Exclusivo para treinamentos na QAx')

        cy.get('input[name=email]').should('be.visible')
            .type(user.email)
        cy.get('input[name=password]').should('be.visible')
            .type(user.password)

        cy.contains('button', 'Entrar').should('be.visible')
            .click()

        cy.get('.logged-user').should('contain', `Olá, ${user.name}`)
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