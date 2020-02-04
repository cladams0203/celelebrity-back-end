const server = require('../server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeEach(() => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
})

describe('Get Celebrities', () => {
    it('GET /api/celebs', async () => {
        const res = await request(server)
        .get('/api/celebs')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(6)
        expect(res.body[0]).toHaveProperty('id')
        expect(res.body[0]).toMatchObject({name: /johnny cash/i})
    })
})