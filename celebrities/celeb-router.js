const router = require('express').Router()

const db = require('./celeb-modal')

router.get('/', (req,res) => {
    db.find()
        .then(celeb => {
            res.status(200).json(celeb)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Unable to get celebrities'})
        })
})


module.exports = router