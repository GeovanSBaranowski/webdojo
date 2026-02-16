describe('POST /api/users/register', () => {
  
  it('Deve cadastrar novo usuario', () => {

    const user = {
      name: 'Wolverine',
      email: 'logan@xmaen.com',
      password: 'senha123'
    }

    cy.task('deleteUser', user.email)

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
      name: 'Cicplop',
      email: 'scott@xmen.com',
      password: 'senha123'
    }

    cy.task('deleteUser', user.email)

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
      email: 'storm@xmen.com',
      password: 'senha123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The \"name\" field is required')

    })
  })

  it('Campo email deve ser obrigatorio', () => {

    const user = {
      name:  'Jean Grey',
      password: 'senha123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The \"email\" field is required')

    })
  })

  it('Campo email deve ser obrigatorio', () => {

    const user = {
      name: 'Professor',
      email: 'charles@xmen.com'
    }

    cy.postUser(user).then((response) => {
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

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Invalid JSON format')

    })

  })
})
