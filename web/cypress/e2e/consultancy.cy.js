import { Individual, Company } from '../fixtures/consultancy.json'

describe('Formulario de Consultoria', () => {

    beforeEach(() => {
        cy.login()
        cy.GoTo('Formulários', 'Consultoria')

        cy.fixture('consultancy')
            .as('consultancyData')
    })

    it('Deve solicitar consultoria individual', () => {

        cy.fillConsultancyForm(Individual)
        cy.SubmitConsultancyForm()
        cy.ValidateConsultancyModal()
    })

    it('Deve solicitar consultoria In company', () => {

        cy.fillConsultancyForm(Company)
        cy.SubmitConsultancyForm()
        cy.ValidateConsultancyModal()
    })

    it('Deve verificar campos obrigatorios', () => {

        cy.SubmitConsultancyForm()

        const requiredFields = [
            { label: 'Nome Completo', message: 'Campo obrigatório' },
            { label: 'Email', message: 'Campo obrigatório' },
            { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }
        ]

        requiredFields.forEach(({label, message}) => {
            cy.contains('label', label)
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', message)
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
        });
    })
})
