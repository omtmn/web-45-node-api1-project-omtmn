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
    .then((user) => {
        if(user){
            res.status(201).json(user)
        } else {
            res.status(404).json({ message: `provide name and bio`})
        }  
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: err.message })
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

server.delete('/api/users/:id', (req, res) => {
    data.remove(req.params.id)
    .then((user) => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: 'does not exist'})
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: 'user could not be deleted' })
    })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    data.update(id, changes)
    .then((user) => {
        if(user){
            res.status(201).json(user)
        } else {
            res.status(404).json({ message: 'does not exist'})
        }
        
    })
    .catch((err) => {
        console.log(err)
        res.status(400).json({ message: err.message })
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
