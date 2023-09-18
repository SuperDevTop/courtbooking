const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    picture: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    rank: {
        type: String,
        required: true
    },

    tournament_seeding: {
        type: String
    },

    handiness: {
        type: String,
        required: true
    },

    tournament_status: {
        type: [String]
    },

    kind: {
        type: String  //ATP or WTA
    },

    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],

    comments: {
        type: [String]
    }
    
})

module.exports = mongoose.model('Player', playerSchema);