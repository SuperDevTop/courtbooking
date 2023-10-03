const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    court_name: {
        type: String,
        required: true
    },

    booker: {
        type: String,
        required: true
    },

    start_time: {
        type: Date,
        required: true
    },

    time_slot: {
        type: Number,
        default: 1
    }, 

    reservation_type: {
        type: String,
        default: 'Practice'
    },

    players: [String]   
});

module.exports = mongoose.model('Booking', bookingSchema);