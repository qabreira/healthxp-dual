/// <reference types="cypress" />
import users from '../fixtures/users.json'
import login from '../support/pages/LoginPage'

describe('login', () => {

    it('deve logar com sucesso', () => {
        const user = users.loginSuccess
        login.doLogin(user)
        cy.get('.logged-user').should('contain', `Olá, ${user.name}`)
            .and('be.visible')
    })

    it('não deve logar com senha incorreta', () => {
        const user = users.wrongPassword
        login.doLogin(user)
        login.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com usuário não cadastrado', () => {
        const user = users.unknownUser
        login.doLogin(user)
        login.checkAlertMessage(user.alertMessage)
    })

    it.only('não deve logar com email incorreto', () => {
        const emails = users.wrongEmail.emails
        const alertMessage = users.wrongEmail.alertMessage
        let outputMessages = []
        let expectedMessages = []

        login.go()

        // EXECUTAR O PROCESSO COM TODOS OS ITENS DE UMA MASSA DE TESTES EM LISTA
        emails.forEach((i) => {
            login.fillCredentials(i)
            login.submit()

            // PEGAR O TEXTO DO POPUP QUE EXIBE MENSAGENS DE ALERTA
            cy.get('#swal2-content')
                .invoke('text')
                .then((text) => {
                    // ENVIAR O TEXTO PARA UMA VARIÁVEL DO TIPO LISTA
                    cy.log(text)
                    outputMessages.push(text)
                    // ALIMENTAR OUTRA LISTA COM A MENSAGEM ESPERADA
                    expectedMessages.push(alertMessage)
                })

            // login.checkAlertMessage(alertMessage)
            login.returnCredentials()
        })
        // COMPARAR AS LISTAS CRIADAS VERIFICANDO SE SÃO IGUAIS
        cy.wrap(outputMessages).should('deep.equal', expectedMessages)
    })

    it('não deve logar com e-mail em branco', () => {
        const user = users.emptyEmail
        login.go()
        login.skipFillEmail(user)
        login.submit()
        login.checkAlertMessage(user.alertMessage)
    })

    it('não deve logar com a senha em branco', () => {
        const user = users.emptyPassword
        login.go()
        login.skipFillPassword(user)
        login.submit()
        login.checkAlertMessage(user.alertMessage)
    })
})