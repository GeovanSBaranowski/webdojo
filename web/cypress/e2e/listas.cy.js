describe('Gerenciamento de perfis no github', () => {
    beforeEach(() => {
        cy.login()
        cy.GoTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve permitir Cadastro de perfil', () => {

        cy.get('#name').type('Geovan')
        cy.get('#username').type('batata')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()


        cy.get('#name').type('Geovan')
        cy.get('#username').type('gege')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', 'gege')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('Geovan')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('QA')
            .should('be.visible')


    })

    it('Deve excluir perfil da lista', () => {

        const profile = {
            name: 'Geovan',
            username: 'baranowski',
            profile: 'Design'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.profile)
        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
        .should('be.visible')
        .as('trProfile')

        cy.get('@trProfile').find('button[title="Remover perfil"]').click()

        cy.contains('table tbody', profile.username)
            .should('not.exist')
    })

    it.only('Deve acessar meu perfil no github', () => {

        const profile = {
            name: 'Geovan',
            username: 'baranowski',
            profile: 'Design'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.profile)
        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile').find('a')
            .should('have.attr', 'href', 'https://github.com/' + profile.username)
            .and('have.attr', 'target', '_blank')

    })
})