describe('GET /api/users', () => {

    const heroes = [
        {
            name: "Bruce Wayne",
            email: "bruce.wayne@wayneenterprises.com",
            password: "senha123"
        },
        {
            name: "Clark Kent",
            email: "clark.kent@dailyplanet.com",
            password: "senha123"
        },
        {
            name: "Diana Prince",
            email: "diana.prince@themiscira.com",
            password: "senha123"
        },
        {
            name: "Barry Allen",
            email: "barry.allen@ccpd.com",
            password: "senha123"
        },
        {
            name: "Arthur Curry",
            email: "arthur.curry@atlantis.com",
            password: "senha123"
        }
    ]

    before(() => {
        heroes.forEach((hero) => {
            cy.postUser(hero)
        })
    })


    it('Deve retrornar uma lsita de usuarios', () => {

        cy.getUsers()
            .then(response => {
            expect(response.status).to.eq(200)

            heroes.forEach((hero) => {
                const found = response.body.find((user) => user.email === hero.email)
                expect(found.name).to.eq(hero.name)
                expect(found.email).to.eq(hero.email)
                expect(found).to.have.property('id')
            })
        })
    })
})