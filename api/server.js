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

server.post('/api/users', (req, res) => {
    const newUser = req.body // info about the new user is in the requests body 
    data.insert(newUser)
    .then((users) => {
        res.status(201).json(users)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: 'provide name and bio' })
    })
})

server.get('/api/users/:id', (req, res) => {
    data.findById(req.params.id)
    .then((user) => {
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: `${req.params.id} does not exist` })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: `${req.params.id} does not exist`})
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
