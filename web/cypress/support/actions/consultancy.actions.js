Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('#name').type(form.name)

    cy.get('#email').type(form.email)

    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)
        .should('have.value', '(47) 99152-1016')

    cy.get('#consultancyType').select(form.consultancyType)

    if (form.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(form.document)
        //.should('have.value', '100.469.239-00')
    }

    if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(form.document)
        //.should('have.value', '100.469.239-00')
    }



    form.dicoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)


    form.techs.forEach((techs) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(techs)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', techs)
            .should('be.visible')
    })

    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('Input')
            .check()
    }
})

Cypress.Commands.add('SubmitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário')
        .click()
})

Cypress.Commands.add('ValidateConsultancyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .should('be.visible', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})
