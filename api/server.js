// BUILD YOUR SERVER HERE
const express = require('express')
const data = require('./users/model')
const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    data.find()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ 
            message: 'users do not exist', 
            err: err.message, 
            stack: err.stack 
        })
    })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body // info about the new user is in the requests body 
    if (!newUser.name || !newUser.bio) {
        res.status(400).json({
            message: "provide name and bio"
        })
    } else {
        data.insert(newUser)
        .then((user) => {
            res.status(201).json(user)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ 
                message: "Please provide name and bio for the user",
                err: err.message,
                stack: err.stack
            })
     })
    }  
})

server.get('/api/users/:id', (req, res) => {
    data.findById(req.params.id)
    .then((user) => {
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json({ 
                message: `does not exist` 
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ 
            message: err.message 
        })
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
        res.status(500).json({ 
            message: 'user could not be deleted',
            err: err.message,
            stack: err.stack
        })
    })
})

server.put('/api/users/:id', async (req, res) => {
    try {
        const user = await data.findById(req.params.id)
        if(!user){
            res.status(404).json({
                message: 'does not exist'
            })
        } else {
            if(!req.body.bio || !req.body.name){
                res.status(400).json({
                    message: 'provide name and bio'
                })
            } else {
                const updatedUser = await data.update(req.params.id, req.body)
                res.status(200).json(updatedUser)
            }
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({ 
            message: "The user could not be modified",
            err: err.message,
            stack: err.stack
         })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
