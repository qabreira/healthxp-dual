import loginPage from '../support/pages/LoginPage'

describe('home', () => {
  it('webapp deve estar online', () => {
    loginPage.go()
  })
})