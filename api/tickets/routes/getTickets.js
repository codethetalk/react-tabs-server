'use strict'

const Boom = require('boom')

module.exports = {
    method: 'GET',
    path: '/api/tickets',
    config: {
        handler: (req, res) => {
            res([
                {
                    firstName: 'Clark',
                    lastName: 'Kent',
                    age: '25',
                    sex: 'male',
                    employed: true,
                    favoriteColor: 'Red',
                    bio: 'Son of knyptoon',
                    id: 1
                }, {
                    firstName: 'Ralph',
                    lastName: 'Wayne',
                    age: '25',
                    sex: 'male',
                    employed: true,
                    favoriteColor: 'Black',
                    bio: 'Hero without powers',
                    id: 2
                }
            ])
        }
    }
}