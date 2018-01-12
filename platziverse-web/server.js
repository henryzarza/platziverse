'use strict'

const debug = require('debug')('platziverse:web')
const chalk = require('chalk')
const http = require('http')
const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const asyncify = require('express-asyncify')
const PlatziverseAgent = require('platziverse-agent')
const { pipe } = require('../platziverse-utils/utils')
const proxy = require('./proxy')

const port = process.env.PORT || 8080
const app = asyncify(express())
const server = http.createServer(app)
const io = socketio(server)
const agent = new PlatziverseAgent()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', proxy)

// Sokect.io / WebSockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  pipe(agent, socket)
})

app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[platziverse-web]')} server lisening on port ${port}`)
  agent.connect()
})
