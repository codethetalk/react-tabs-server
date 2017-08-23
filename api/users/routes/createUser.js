'use strict'

const bcrypt = require('bcrypt-nodejs')
const Boom = require('boom')
const User = require('../model/User')
const createUserSchema = require('../schemas/createUser')
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser
const createToken = require('../util/token')

function hashPassword(password, cb) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, null, (err, hash) => {
      return cb(err, hash)
    })
  })
}

module.exports = {
  method: 'POST',
  path: '/api/users',
  config: {
    auth: false,
    pre: [
      { method: verifyUniqueUser }
    ],
    handler: (req, res) => {
      console.log(req.payload.email)
      let user = new User()
      user.email = req.payload.email
      user.username = req.payload.username
      user.admin = false
      hashPassword(req.payload.password, (err, hash) => {
        if (err) {
          throw Boom.badRequest(err)
        }
        user.password = hash
        user.save((err, user) => {
          if (err) {
            throw Boom.badRequest(err)
          }
          res({ id_token: createToken(user) }).code(201)
        })
      })

    },
    validate: {
      payload: createUserSchema
    }
  }
}
