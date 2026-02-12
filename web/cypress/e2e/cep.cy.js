import addres from '../fixtures/cep.json'

describe('CEP', () => {
    beforeEach(() => {
        cy.login()
        cy.GoTo('Integração', 'Consulta de CEP')
    })

    it('Deve validar consulta de CEP', () => {
        // cy.intercept('GET', 'https://viacep.com.br/ws/04534011/json/', {
        //     statusCode: 200
        // }).as('getCep')

        cy.get('#cep').type(addres.cep)
        cy.contains('button', 'Buscar').click()

        // cy.wait('@getCep')

        cy.get('#street').should('have.value', addres.street)
        cy.get('#neighborhood').should('have.value', addres.neighborhood)
        cy.get('#city').should('have.value', addres.city)
        cy.get('#state').should('have.value', addres.state)
    })
})