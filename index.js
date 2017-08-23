'use strict'
require('dotenv').config()
const Hapi = require('hapi')
const Boom = require('boom')
const mongoose = require('mongoose')
const glob = require('glob')
const path = require('path')
const secret = require('./config')



const server = new Hapi.Server()
const port = process.env.PORT
console.log(port)
server.connection({ port: port, routes: { cors: true } })

const dbUrl = process.env.MONGODB

server.register(require('hapi-auth-jwt'), (err) => {

  server.auth.strategy('jwt', 'jwt', 'required', {
    key: secret,
    verifyOptions: { algorithms: ['HS256'] }
  })

  glob.sync('api/**/routes/*.js', { // routes according to folder structure
    root: __dirname
  }).forEach(file => {
    const route = require(path.join(__dirname, file))
    server.route(route)
  })
})

server.start((err) => {
  if (err) {
    throw err
  }
  mongoose.connect(dbUrl, {}, (err) => {
    if (err) {
      throw err
    }
  })
})