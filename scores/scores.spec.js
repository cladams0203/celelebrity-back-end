const server = require('../server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeEach(() => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
})

describe('Get All Scores', () => {
    it('GET /api/scores', async () => {
        const res = await request(server)
        .get('/api/scores')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(0)
        expect(res.type).toBe('application/json')
    })
})

describe('GET User Scores', () => {
    it('GET /api/scores/1', async () => {
        const res = await request(server)
        .get('/api/scores/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(0)
        expect(res.type).toBe('application/json')
    })
})

describe('POST User Score', () => {
    it('POST /api/scores/1', async () => {
        const register = await request(server)
            .post('/api/users/register')
            .send({username: 'chris', password: 'taco'})
        const add = await request(server)
            .post('/api/scores/1')
            .send({score: 500})
        const res = await request(server)
            .get('/api/scores/1')
            expect(add.status).toBe(201)
            expect(res.body[0]).toHaveProperty('score')
            expect(res.body).toHaveLength(1)
            expect(res.type).toBe('application/json')
            expect(res.body[0]).toMatchObject({score: 500})
    })
})