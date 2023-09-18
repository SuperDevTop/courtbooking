const mongoose = require('mongoose');
const Booking = require('./booking');

const courtSchema = new mongoose.Schema({
    court_number: {
        type: Number,
        required: true
    },

    blocked: {
        type: Boolean,
        default: false
    },

    kind: {
        type: String,
        default: 'ATP'
    },

    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }], 

    bookedTimes: [String]
});

module.exports = mongoose.model('Court', courtSchema);