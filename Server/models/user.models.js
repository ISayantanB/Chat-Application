const mongoose = require('mongoose')

const user = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        about: { type: String }
    },
    { collection: 'user-data' }
)


const message = new mongoose.Schema(
    {
        id: { type: String, required: true },
        id_To: { type: String, required: true },
        message_Body: { type: String, required: true },
        time: { type: Date, default: Date.now, required: true }
    },
    { collection: 'message-data' }
)

const relation = new mongoose.Schema(
    {
        id1: { type: String, required: true },
        id2: { type: String, required: true },
    },
    { collection: 'user-relation' }
)

const model1 = mongoose.model('UserData', user)
const model2 = mongoose.model('MessageData', message)
const model3 = mongoose.model('UserRelation', relation)
module.exports = { model1, model2, model3 }