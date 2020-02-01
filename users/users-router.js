const router = require('express').Router()
const db = require('./users-modal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', (req,res) => {
    const { username, password } = req.body
    !username || !password ?
        res.status(403).json({message: 'please provide a username and a password'}) :
        console.log()
        db.insert({ username, password: bcrypt.hashSync(password, 4) })
            .then(user => {
                db.findById(user)
                    .then(user => {
                        const token = generateToken(user)
                        const { id, username } = user
                        res.status(201).json({message: `successfully registered as ${username}`,
                        id, username, token
                    })
                    })
                
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: 'unable to register user'})
            })
})

router.post('/login', (req,res) => {
    const { username, password } = req.body
    !username || !password ?
        res.status(403).json({message: 'please provide a username and a password'}) :
        db.findByUsername(username)
            .then(user => {
               if( user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                const {id, username} = user
                res.status(200).json({message: 'Login successful',id, username, token}) 
               }else {
                res.status(403).json({message: 'invalid username or password'})
               }    
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: 'unable to register user'})
            })
})


function generateToken (user) {
    const payload = {
        username: user.username
    }
    const options ={
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}
module.exports = router