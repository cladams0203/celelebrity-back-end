const router = require('express').Router()
const db = require('./scores-modal')


router.get('/', (req,res) => {
    db.find()
        .then(score => {
            res.status(200).json(score)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to get scores'})
        })
})

router.get('/:id', (req,res) => {
    db.findByUser(req.params.id)
        .then(score => {
            res.status(200).json(score)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to get users scores'})
        })
})

router.post('/:id', (req,res) => {
    db.insert(req.params.id, req.body.score)
        .then(score => {
            res.status(201).json({message: 'added score successfully'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'unable to add score'})
        })
})





module.exports = router