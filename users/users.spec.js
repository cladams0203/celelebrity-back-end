const server = require('../server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeEach(() => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
})

describe('Register User', () => {
    it('POST /api/users/register', async () => {
        const res = await request(server)
            .post('/api/users/register')
            .send({ username: "chris", password: "taco" })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('message')
        expect(res.type).toBe('application/json')
    })
})