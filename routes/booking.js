const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Player = require("../models/players");
const Court = require("../models/court");

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
      warmups,
      balls,
      option,
    } = req.body;

    const updatedPlayers = await Player.find({});

    const newBook = new Booking({
      court_name,
      booker,
      start_time,
      time_slot,
      reservation_type,
      players,
      option,
      warmups,
      balls,
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

    res.status(200).json({
      message: "A book created successfully!",
      booking_data: booking_data,
      players: updatedPlayers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/updateBook", async (req, res) => {
  try {
    const {
      id,
      time_slot,
      reservation_type,
      players,
      court_names,
      date,
      warmups,
      balls,
      option,
    } = req.body;

    console.log("update booking " + id);
    await Booking.updateOne(
      { _id: id },
      {
        $set: {
          time_slot: time_slot,
          reservation_type: reservation_type,
          players: players,
          option: option,
          warmups: warmups,
          balls: balls,
        },
      }
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

    res.status(200).json({
      message: "The reservation was updated successfully!",
      booking_data: booking_data,
    });
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

    const courts = await Court.find({});

    res.status(200).json({ booking_data: booking_data, courts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.post("/deleteBooking", async (req, res) => {
  try {
    const { id, court_names, date } = req.body;

    const response = await Booking.deleteOne({ _id: id });

    if (response.deletedCount !== 1) {
      res.status(500).json({ message: "Booking not found with id: " + id });
    }

    const realDate = new Date(date);
    const nextDay = new Date(realDate);
    nextDay.setDate(nextDay.getDate() + 1);

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
