const express = require("express");
const router = express.Router();

const Court = require("../models/court");

router.get("/getCourts", async (req, res) => {
  try {
    const courts = await Court.find({});

    if (courts.length === 0) {
      res.status(200).json({ courts: [] });
    } else {
      res.status(200).json({ courts });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
});


module.exports = router;
