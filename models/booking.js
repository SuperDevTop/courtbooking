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

    option: {
        type: String
    },
    
    players: [String],
    
    warmups : [Boolean],

    balls: [Boolean]
});

module.exports = mongoose.model('Booking', bookingSchema);