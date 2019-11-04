const request = require('supertest')

const User = require('../../src/models/User')

describe('Users', () => {
  const defaultUser = {
    email: 'test@email.com',
    password: '123456',
    name: 'Test User',
  }

  before(done => {
    User.query()
      .del()
      .then(() => done())
  })

  it('should create user with valid data', done => {
    request(app)
      .post('/v1/users')
      .send(defaultUser)
      .then(response => {
        defaultUser.id = response.body.user.id

        expect(response.status).to.be.eql(201)
        expect(response.body.user.name).to.be.eql(defaultUser.name)

        done()
      })
  })

  it('should not create user without password', done => {
    request(app)
      .post('/v1/users')
      .send({ ...defaultUser, password: undefined })
      .then(response => {
        expect(response.status).to.be.eql(400)

        done()
      })
  })

  it('should return one user by id', done => {
    request(app)
      .get(`/v1/users/${defaultUser.id}`)
      .send()
      .then(response => {
        expect(response.status).to.be.eql(200)
        expect(response.body.user.name).to.be.eql(defaultUser.name)

        done()
      })
  })

  it('should return 404 for not found user', done => {
    request(app)
      .get('/v1/users/notAnId')
      .send()
      .then(response => {
        expect(response.status).to.be.eql(404)

        done()
      })
  })

  it('should edit user name', done => {
    request(app)
      .put(`/v1/users/${defaultUser.id}`)
      .send({ ...defaultUser, name: 'Edited Name' })
      .then(response => {
        expect(response.status).to.be.eql(200)
        expect(response.body.user.name).to.be.eql('Edited Name')

        defaultUser.name = 'Edited Name'

        done()
      })
  })

  it('should return 404 on editing not found user', done => {
    request(app)
      .put('/v1/users/notAnId')
      .send(defaultUser)
      .then(response => {
        expect(response.status).to.be.eql(404)

        done()
      })
  })

  it('should delete user by id', done => {
    request(app)
      .delete(`/v1/users/${defaultUser.id}`)
      .send()
      .then(response => {
        expect(response.status).to.be.eql(204)

        done()
      })
  })

  after(done => {
    User.query()
      .del()
      .then(() => done())
  })
})
