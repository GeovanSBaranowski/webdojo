describe('Validacoes de alertas em JS', () => {
    beforeEach(() => {
        cy.login()
        cy.GoTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta', () => {

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um dialogo e validar resposta positiva', () => {

        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true; //True Simula botao OK
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })


        cy.contains('button', 'Mostrar Confirm').click()

    })

    it('Deve confirmar um dialogo e validar resposta negativa', () => {

        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false; //false Simula botao Cancelar
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })


        cy.contains('button', 'Mostrar Confirm').click()

    })

    it('Deve interagir com um prompt, inserir texto e validar mensagem', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Geovan')

            cy.on('window:alert', (msg) => {
                expect(msg).to.equal('Olá Geovan! Boas-vindas ao WebDojo!')
            })

            cy.contains('button', 'Mostrar Prompt').click()
        })
    })
})