const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const celebRouter = require('./celebrities/celeb-router')
const userRouter = require('./users/users-router')
const scoresRouter = require('./scores/scores-router')

const server = express()


server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/celebs', celebRouter)
server.use('/api/users', userRouter)
server.use('/api/scores', scoresRouter)


module.exports = server