require('dotenv').config()
const app = require('./app')
const debug = require('debug')('courses-management:server')
const http = require('http')

const server = http.createServer(app)

const port = process.env.PORT || '3000'

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

const onListening = () => {
  const addr = server.address()
  debug(`Listening on http://localhost:${addr.port}`)
}

app.set('port', port)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
