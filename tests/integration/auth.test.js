const request = require('supertest')

const User = require('../../src/models/User')

describe('Authentication', () => {
  const defautlUser = {
    name: 'Test User',
    email: 'test@email.com',
    password: '123456',
  }

  before(done => {
    User.query()
      .del()
      .then(() => User.query().insert(defautlUser))
      .then(() => done())
  })

  it('should authenticate with valid credentials', done => {
    request(app)
      .post('/v1/auth')
      .send({ email: defautlUser.email, password: defautlUser.password })
      .then(response => {
        expect(response.status).to.be.eql(200)

        done()
      })
  })

  it('should not authenticate with wrong password', done => {
    request(app)
      .post('/v1/auth')
      .send({ email: defautlUser.email, password: 'wrongpass' })
      .then(response => {
        expect(response.status).to.be.eql(400)

        done()
      })
  })

  it('should not authenticate with wrong email', done => {
    request(app)
      .post('/v1/auth')
      .send({ email: 'wrong@email.com', password: defautlUser.password })
      .then(response => {
        expect(response.status).to.be.eql(400)

        done()
      })
  })

  after((done) => {
    User.query()
      .del()
      .then(() => done())
  })
})
