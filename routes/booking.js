const express = require('express')
const router = express.Router();

const Player =  require('../models/players')
const Booking =  require('../models/booking')

router.post('/createBook', async(req, res) => {
    try {
        // const { data } = req.body
        const { court_number, booker, start_time, time_slot, reservation_type, players } = req.body

        const newBook =  new Booking({
            court_number,
            booker,
            start_time,
            time_slot, reservation_type,
            players
        })

        await newBook.save()
        console.log('book success');

        res.status(200).json({ message: 'A book created successfully!' })

    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router;