const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/user");
const Court = require("../models/court");

router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      res.status(200).json({ users: [] });
    } else {
      res.status(200).json({ users });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
});

router.post("/addUser", async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the pwd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    const users = await User.find({});

    res
      .status(201)
      .json({ message: "User registered successfully!", users: users });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
});

router.post("/updateCourt", async (req, res) => {
  try {
    const { courtName, blocked } = req.body;

    Court.updateOne(
      { name: courtName },
      {
        $set: {
          blocked: blocked,
        },
      }
    )
      .then(async () => {
        const courts = await Court.find({});
        res.status(200).json({ courts });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
