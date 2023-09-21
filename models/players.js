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

    nat: {
        type: String,
        required: true
    },

    tournament_seed: {
        type: Number,
        required: true

    },

    handiness: {
        type: String,
        required: true
    },

    tournament_status: {
        type: [String]
    },

    kind: {
        type: String,  //ATP or WTA
        required: true
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