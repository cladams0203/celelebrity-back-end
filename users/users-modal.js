const db = require('../data/dbConfig')

module.exports = {
    insert,
    findById,
    findByUsername
}

function insert(user) {
    
    return db('users').insert(user, 'id')
        .then(([id]) => id)
}

function findById(id) {
    return db('users').where({ id })
        .then(([user]) => user)
}

function findByUsername(username) {
    return db('users').where({ username })
        .then(([user]) => user)
}