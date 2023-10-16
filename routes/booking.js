const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");

router.post("/createBook", async (req, res) => {
  try {
    const {
      court_name,
      booker,
      start_time,
      time_slot,
      reservation_type,
      players,
      date,
      court_names,
    } = req.body;

    const newBook = new Booking({
      court_name,
      booker,
      start_time,
      time_slot,
      reservation_type,
      players,
    });

    await newBook.save();
    console.log("book success");

    const realDate = new Date(date);
    const nextDay = new Date(realDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const booking_data = await Promise.all(
      court_names.map(async (court) => {
        const bookings = await Booking.find({
          court_name: court,
          start_time: { $gte: realDate, $lt: nextDay },
        });
        return bookings;
      })
    );

    res.status(200).json({ message: "A book created successfully!", booking_data: booking_data});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/updateBook", async (req, res) => {
  try {
    const { id, time_slot, reservation_type, players, court_names, date } = req.body;

    console.log("update booking " + id);
    const result = await Booking.updateOne(
      { _id: id },
      {
        $set: {
          time_slot: time_slot,
          reservation_type: reservation_type,
          players: players,
        },
      },
    );

    console.log("update success");
    const realDate = new Date(date);
    const nextDay = new Date(realDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const booking_data = await Promise.all(
      court_names.map(async (court) => {
        const bookings = await Booking.find({
          court_name: court,
          start_time: { $gte: realDate, $lt: nextDay },
        });
        return bookings;
      })
    );

    res
      .status(200)
      .json({ message: "The reservation was updated successfully!", booking_data: booking_data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/getBookingdata", async (req, res) => {
  try {
    const { court_names, date } = req.body;

    const realDate = new Date(date);
    const nextDay = new Date(realDate);
    nextDay.setDate(nextDay.getDate() + 1);
    console.log(realDate);

    // Use map and Promise.all to execute queries concurrently
    const booking_data = await Promise.all(
      court_names.map(async (court) => {
        const bookings = await Booking.find({
          court_name: court,
          start_time: { $gte: realDate, $lt: nextDay },
        });
        return bookings;
      })
    );

    res.status(200).json({ booking_data: booking_data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
