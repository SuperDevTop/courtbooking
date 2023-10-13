const express = require('express')
const router = express.Router();

const Booking = require('../models/booking')

router.post('/createBook', async(req, res) => {
    try {
        const { court_name, booker, start_time, time_slot, reservation_type, players } = req.body

        console.log(start_time);
        const newBook =  new Booking({
            court_name,
            booker,
            start_time,
            time_slot, 
            reservation_type,
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

router.post('/getBookingdata', async(req, res) => {
    try {
        const { court_names, date } = req.body

        const realDate = new Date(date);
        const nextDay = new Date(realDate);
        nextDay.setDate(nextDay.getDate() + 1);

        Booking.find({
        start_time: {
            $gte: realDate,
            $lt: nextDay,
        }});
        // Use map and Promise.all to execute queries concurrently
        const booking_data = await Promise.all(
            court_names.map(async (court) => {
                const bookings = await Booking.find({ court_name: court, start_time: { $gte: realDate, $lt: nextDay }});
                return bookings;
            })
        );

        res.status(200).json({ 'booking_data': booking_data })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

module.exports = router;