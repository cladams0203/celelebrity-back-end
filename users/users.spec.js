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
        expect(res.body).toHaveProperty('id')
        expect(res.type).toBe('application/json')
        expect(res.body).toMatchObject({message: 'successfully registered as chris'})
        expect(res.body).toHaveProperty('token')
    })
})

describe('Login User', () => {
    it('POST /api/users/login', async () => {
        const register = await request(server)
        .post('/api/users/register')
        .send({ username: "chris", password: "taco" })
            .then(async () => {
                const res = await request(server)
                .post('/api/users/login')
                .send({username: 'chris', password: 'taco'})
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('id')
                expect(res.type).toBe('application/json')
                expect(res.body).toMatchObject({message: 'Login successful'})
                expect(res.body).toHaveProperty('token')
            })
    })
})

describe('Edit User', () => {
    it('PUT /api/users/1', async () => {
        const register = await request(server)
        .post('/api/users/register')
        .send({ username: "chris", password: "taco" })
        const put = await request(server)
        .put('/api/users/1')
        .send({username: "chris2", password: "taco2"})
        .set('authorization', register.body.token)
        expect(put.status).toBe(201)
        expect(put.body).toMatchObject({message: 'Updated user successfully'})
        expect(put.type).toBe('application/json')
    }) 
})

describe('Delete User', () => {
    it('Delete /api/users/1', async () => {
        const register = await request(server)
        .post('/api/users/register')
        .send({ username: "chris", password: "taco" })
        const put = await request(server)
        .delete('/api/users/1')
        .set('authorization', register.body.token)
        expect(put.status).toBe(201)
        expect(put.body).toMatchObject({message: 'successfully removed user'})
        expect(put.type).toBe('application/json')
    })
})