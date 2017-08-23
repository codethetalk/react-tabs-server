'use strict'

const secret = require('../../../config')
const moment = require('moment')
const jwt = require('jwt-simple')

function createToken(user) {
  const role = "guest"
  const aud = 'react-tabs'
  const iss = 'http://localhost:5000/'
  const usage = 'access_token'
  const permission = ["guest"]
  const sub = user._id
  const name = user.username
  const email = user.email
  const iat = moment().unix()
  const exp = moment().add(14, 'days').unix()
  const nbf = iat

  return jwt.encode({ sub, name, email, role, permission, aud, iss, iat, exp, nbf }, secret )
}

module.exports = createToken