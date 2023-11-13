const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        default: null
    },

    natl: {
        type: String,
        required: true
    },

    rank: {
        type: Number,
        required: true,
        default: 0
    },

    tournament_seed: {
        type: Number,
        required: true

    },

    right_handed: {
        type: Boolean,
        required: true,
        default: true,
    },

    singles_in: {
        type: Boolean,
        required: true,
        default: false
    },

    doubles_in: {
        type: Boolean,
        required: true,
        default: false
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
    },

    ball: {
        type: Boolean,
        default: false,
    },

    warm_up: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Player', playerSchema);