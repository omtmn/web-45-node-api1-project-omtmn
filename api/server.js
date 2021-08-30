// BUILD YOUR SERVER HERE
const express = require('express')
const data = require('./users/model')
const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    data.find()
    .then((user) => {
        res.status(200).json(user)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: 'users do not exist' })
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
