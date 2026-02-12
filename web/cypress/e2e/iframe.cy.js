describe('Tocar o video', () => {
    it('Deve tocar o video de exemplo', () => {
        cy.login()
        cy.contains('Video').click()

        cy.wait(3000)

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body')
            .then(cy.wrap)
            .as('iFramePlayer')

        cy.get('@iFramePlayer')
            .find('.play-button')
            .click()

        cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')
    })
})