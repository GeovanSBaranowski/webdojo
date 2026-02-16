import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Expert', () => {
    beforeEach(() => {
        cy.Start()
    })

    it('Deve manipular os atributos de elementos', () => {

        cy.get('#email').invoke('val', 'papito@teste.com.br')

        cy.get('#password').invoke('removeAttr', 'class')
            .type('senha123')

        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')
    })

    it('Nao deve logar com senha invalida', () => {
        cy.get('#email').type('papito@webdojo.com')
        cy.get('#password').type('papiasdasds{enter}')

        cy.get('[data-sonner-toaster=true] div[class=title]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('@toast')
            .should('not.exist')
    })

    it('Simulando a tecla TAB com cy.press', () => {
        cy.log('todo')

        cy.get('body').press('Tab')
        cy.focused().should('have.attr', 'id', 'email')

        cy.get('#email').press('Tab')
    })

    it.only('Deve realizar uma carga de dados fakes', () => {
        cy.log('todo')

        _.times(5, () => {
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'senha123'

            cy.log(name)
            cy.log(email)
            cy.log(password)
        })
    })
})