const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },

    receiver: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    time: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Chat', chatSchema)