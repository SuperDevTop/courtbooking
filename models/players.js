const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: true
    },

    natl: {
        type: String,
        required: true
    },

    tournament_seed: {
        type: Number,
        required: true

    },

    right_handed: {
        type: Boolean,
        required: true
    },

    singles_in: {
        type: Boolean,
        required: true
    },

    doubles_in: {
        type: Boolean,
        required: true
    },

    status: {
        type: String, 
        required: true
    },

    atp_wta: {
        type: String,
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