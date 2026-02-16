describe('DELTE /api/users/:id', () => {

    context('remocao', () => {

        let userId

        const user = {
            name: "Bruce Banner",
            email: "bruce@avengers.com",
            password: "senha123"
        }

        before(() => {

            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
        })

        it('Deve remover usuario', () => {
            cy.deleteUser(userId)
                .then(reponse => {
                    expect(reponse.status).to.eq(204)
                })
        })

        after(() => {
            cy.getUsers().then(reponse => {
                const hulk = reponse.body.find(user => user.id === userId)
                expect(hulk).to.be.undefined
            })
        })
    })

    context('ID inexistente', () => {

        let userId

        const user = {
            name: "Tony Stark",
            email: "stark@avengers.com",
            password: "senha123"
        }

        before(() => {

            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })

            cy.task('deleteUser', user.email)
        })

        it('Deve retornar User not found', () => {
            cy.deleteUser(userId)
                .then(reponse => {
                expect(reponse.status).to.eq(404)
                expect(reponse.body.error).to.eq('User not found')
            })
        })
    })
})