import { formatarDataBR } from '../support/utils.js'

describe('Login', () => {

  it.only('Deve logar com Sucesso', () => {

    cy.Start()
    cy.viewport('iphone-xr')
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  
    cy.getCookie('login_date').should('exist')
    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(formatarDataBR())
    })

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[a-f0-9]{32}$/i)
    })
  })

  it('Nao deve logar com senha invalida', () => {
    cy.Start()
    cy.submitLoginForm('papito@webdojo.com', 'katana12')

    cy.contains('button', 'Entrar').click()

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Nao deve logar com email invalido', () => {
    cy.Start()
    cy.submitLoginForm('papito@webdojo404.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})

