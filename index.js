require('dotenv').config()
const server = require('./server')

const PORT = process.env.PORT || 5000
server.get('/', (req,res) => {
    res.status(200).json({message:  'serveris running'})
})
server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})