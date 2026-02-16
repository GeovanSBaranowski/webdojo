describe('PUT /api/users/:id', () => {

    context('Atualizacao', () => {
        let userId

        const originalUser = {
            name: 'Peter Parker',
            email: 'parker@stark.com',
            password: 'senha123'
        }

        const updateUser = {
            name: 'spiderman',
            email: 'spider@marvel.com',
            password: 'senha123'
        }

        before(() => {

            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updateUser.email)

            cy.postUser(originalUser).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
        })

        it('Atualiza usuario existente pelo id', () => {
            cy.putUser(userId, updateUser).then(response => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then(reponse => {
                const spider = reponse.body.find(user => user.id === userId)
                expect(spider).to.exist
                expect(spider.name).to.eq(updateUser.name)
                expect(spider.email).to.eq(updateUser.email)
            })
        })

    })

    context('Campos Obrigatorios', () => {

        it('Campo name deve se robrigatorio', () => {

            const user = {
                email: 'storm@xmen.com',
                password: 'senha123'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('The \"name\" field is required')

            })
        })

        it('Campo email deve ser obrigatorio', () => {

            const user = {
                name: 'Jean Grey',
                password: 'senha123'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('The \"email\" field is required')

            })
        })

        it('Campo email deve ser obrigatorio', () => {

            const user = {
                name: 'Professor',
                email: 'charles@xmen.com'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('The \"password\" field is required')

            })

        })

        it('Nao deve dar certo com json mal formatado', () => {

            const user = `{
                name: 'Magneto',
                email: 'erik@xmen.com'
                password: 'senha123'
                }`

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Invalid JSON format')

            })

        })
    })

    context('ID inexistente', () => {

        let userId

        const originalUser = {
            name: 'Tony Satrk',
            email: 'stark@stark.com',
            password: 'senha123'
        }

        const updateUser = {
            name: 'Ironman',
            email: 'ironman@marvel.com',
            password: 'senha123'
        }

        before(() => {

            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updateUser.email)

            cy.postUser(originalUser).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })

            cy.task('deleteUser', originalUser.email)
        })

        it('Deve retornar User not found', () => {
            cy.api({
                method: 'PUT',
                url: 'http://localhost:3333/api/users/' + userId,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: updateUser,
                failOnStatusCode: false
            }).then(reponse => {
                expect(reponse.status).to.eq(404)
                expect(reponse.body.error).to.eq('User not found')
            })
        })
    })
})