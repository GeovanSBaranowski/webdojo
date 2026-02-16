import { faker } from '@faker-js/faker'

describe('POST /api/users/register', () => {
  it('Deve cadastrar novo usuario', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'senha123'
    }

    const integerRegex = /^-?\d+$/;

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)

      expect(response.body.message).to.eq('User successfully registered!')
      expect(response.body.user.id).to.match(integerRegex)
      expect(response.body.user.name).to.eql(user.name)
      expect(response.body.user.email).to.eql(user.email)
    })

  })

  it('Nao deve cadastrar email ja cadastrado', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'senha123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('Email already registered')

    })

  })

  it('Campo name deve se robrigatorio', () => {

    const user = {
      email: faker.internet.email(),
      password: 'senha123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The \"name\" field is required')

    })
  })

  it('Campo email deve ser obrigatorio', () => {

    const user = {
      name: faker.person.fullName(),
      password: 'senha123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The \"email\" field is required')

    })
  })

  it('Campo email deve ser obrigatorio', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email()
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The \"password\" field is required')

    })

  })

  it('Nao deve dar certo com json mal formatado', () => {

    const user = `{
      name: 'Geovan',
      email: 'geovan@email.com'
      password: 'senha123'
    }`

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Invalid JSON format')

    })

  })
})
