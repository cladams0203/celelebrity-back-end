const db = require('../data/dbConfig')

module.exports = {
    find,
    findByUser,
    insert,
    remove
}

function find() {
    return db('scores')
}

function findByUser(id) {
    return db('scores').where('user_id', id)
}

function insert(id, score) {
    return db('scores').insert({user_id : id, score}, 'id')
        .then(([id]) => id)
}

function remove(id) {
    return db('scores').where('user_id', id).del()
}