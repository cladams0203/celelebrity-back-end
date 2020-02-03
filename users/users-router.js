const router = require('express').Router()
const db = require('./users-modal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const middleWare = require('../middleware')

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

router.put('/:id', middleWare.validateToken, (req,res) => {
   const { username, password } = req.body
    !username || !password ?
        res.status(403).json({message: 'Please provide a username and password'}) :
        db.findById(req.params.id)
            .then(user => {
                if(user) {
                    db.update(req.user.id, { username, password: bcrypt.hashSync(password, 4) })
                    .then(user => {
                        res.status(201).json({message: 'Updated user successfully'})
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({message: 'Unable to edit user'})
                    })
                }else {
                    res.status(403).json({message: 'user id does not exist'})
                }
                
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: 'unable to edit user'})
            })
        
})
router.delete('/:id', middleWare.validateToken, (req,res) => {
    db.find(req.params.id)
        .then(user => {
            if(user) {
                db.remove(req.params.id)
                    .then(user => {
                        res.status(201).json({message: 'successfully removed user'})
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({message: 'unable to remove user'})
                    })
            }else{
                res.status(403).json({message: 'User id is invlaid'})
            }
        })
})
router.get('/', (req,res) => {
    db.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Unable to find users'})
        })
})



function generateToken (user) {
    const payload = {
        user: user.username,
        id: user.id
    }
    const options ={
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}
module.exports = router