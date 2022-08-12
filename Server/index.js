const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const User = require('./models/user.models')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/UserData')

var user = ''

app.post('/api/register', async (req, res) => {
    try {
        await User.model1.create({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            about: req.body.about
        })
        return res.json({ status: true })
    } catch (err) {
        return res.json({ status: false })
    }
})

app.post('/api/login', async (req, res) => {
    try {
        user = await User.model1.findOne({
            username: req.body.username,
            password: req.body.password
        })
    } catch (error) {
        return res.json({ status: false })
    }

    if (user) {
        return res.json({ status: true })
    } else {
        return res.json({ status: false })
    }
})

app.post('/api/getUsername', async (req, res) => {
    return res.json({username: user})
})

app.post('/api/getRelation', async (req, res) => {
    const relation = await User.model3.find({
        id1: user.username
    })
    return res.json({ relation: relation })
})

app.post('/api/getUsernameInfo', async (req, res) => {
    let usernameDetails = await User.model1.findOne({
        username: req.body.usernameTo
    })
    return res.json({ username: usernameDetails })
})

app.post('/api/search', async (req, res) => {
    const exist = await User.model1.find({ 
        username: { $regex: req.body.usernameTo, $options: "i", $ne: user.username } 
    })
    if (exist == null) {
        return res.json({ exist: 'No matches' })
    } else {
        return res.json({ exist: exist })
    }
})

app.post('/api/message', async (req, res) => {
    var relation = ''
    if (user.username != undefined) {
        try {
            if (req.body.message != '') {
                await User.model2.create({
                    id: user.username,
                    id_To: req.body.usernameTo,
                    message_Body: req.body.message
                })
                relation = await User.model3.find({
                    id1: user.username,
                    id2: req.body.usernameTo
                })
                if (relation == '') {
                    try {
                        await User.model3.create({
                            id1: user.username,
                            id2: req.body.usernameTo
                        })
                        await User.model3.create({
                            id1: req.body.usernameTo,
                            id2: user.username
                        })
                    } catch (error) {}
                }
            }
            relation = await User.model3.find({
                id1: user.username
            })
            message = await User.model2.find({ $or : [
                {id: user.username,
                id_To: req.body.usernameTo}, 
                {id: req.body.usernameTo,
                id_To: user.username}]
            }).sort({time: 1})
            return res.json({ status: true, message: message, relation: relation })
        } catch (err) {
            return res.json({ status: false })
        }
    } else {
        return res.json({ status: false })
    }
})

app.post('/api/selfTalk', async (req, res) => {
    if (user.username != undefined) {
        try {
            if (req.body.message != '') {
                await User.model2.create({
                    id: user.username,
                    id_To: user.username,
                    message_Body: req.body.message
                })
            }
            message = await User.model2.find({
                id: user.username,
                id_To: user.username
            }).sort({time: 1})
            return res.json({ status: true, message: message })
        } catch (err) {
            return res.json({ status: false })
        }
    } else {
        return res.json({ status: false })
    }
})

app.post('/api/update', async (req, res) => {
    try {
        user = await User.model1.findByIdAndUpdate({_id:req.body._id}, {$set:req.body.data}, {new: true, useFindAndModify: false});
        return res.json({ user: user })
    } catch (error) {}
})

app.listen(1337, () => {
    console.log("Server started")
})