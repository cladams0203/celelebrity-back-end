const db = require('../data/dbConfig')

module.exports = {
    insert,
    findById,
    findByUsername,
    update,
    find,
    remove
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

function update(id, user) {
    return db('users').where({ id }).update(user)
}
function find() {
    return db('users')
}
function remove(id) {
    return db('users').where({ id }).del()
}