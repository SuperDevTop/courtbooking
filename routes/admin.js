const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/user");
const Court = require("../models/court");
const Player = require("../models/players");

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

router.post("/deleteUser", async (req, res) => {
  try {
    const { email } = req.body;

    await User.deleteOne({ email: email });

    const users = await User.find({});

    res.status(201).json({
      message: "The user has been deleted successfully!",
      users: users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
});

router.post("/addCourt", async (req, res) => {
  try {
    const { name } = req.body;

    const existingCourt = await Court.findOne({ name });

    if (existingCourt) {
      return res.status(400).json({ message: "Court already exists!" });
    }

    // Create a new court
    const newCourt = new Court({
      name,
    });

    await newCourt.save();
    const courts = await Court.find({});

    res
      .status(201)
      .json({ message: "Court registered successfully!", courts: courts });
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

router.post("/updateUser", async (req, res) => {
  const { name, email, role, phone, password } = req.body;
  let set;

  if (password === "") {
    set = { name, phone, role };
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    set = { name, phone, role, password: hashedPassword };
  }

  User.findOneAndUpdate(
    { email: email },
    {
      $set: set,
    },
    { new: true }
  )
    .then((user) => {
      console.log("updated user:");
      console.log(user);
      res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/deletePlayer", async (req, res) => {
  try {
    const { name } = req.body;

    await Player.deleteOne({ name: name });

    res.status(201).json({
      message: "The player has been deleted successfully!",
      name,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server error" });
  }
});

router.post("/deleteCourt", async (req, res) => {
  try {
    const { name } = req.body;

    await Court.deleteOne({ name: name });

    res.status(201).json({
      message: "The court has been deleted successfully!",
      name,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server error" });
  }
});

router.post("/addPlayer", async (req, res) => {
  try {
    const { name, natl, atp_wta, rank, status, tournament_seed } = req.body;

    const existingPlayer = await Player.findOne({ name });

    if (existingPlayer) {
      return res.status(400).json({ message: "Player already exists!" });
    }

    // Create a new Player
    const newPlayer = new Player({
      name,
      natl,
      atp_wta,
      rank,
      status,
      tournament_seed,
    });

    await newPlayer.save();
    const savedPlayer = await Player.findOne({ name });

    res
      .status(201)
      .json({
        message: "Player registered successfully!",
        players: savedPlayer,
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
});

router.post("/updatePlayer", async (req, res) => {
  const {
    name,
    natl,
    rank,
    status,
    atp_wta,
    singles_in,
    doubles_in,
    tournament_seed,
    right_handed,
  } = req.body;

  Player.findOneAndUpdate(
    { name: name },
    {
      $set: {
        natl: natl,
        rank: rank,
        status: status,
        atp_wta: atp_wta,
        tournament_seed: tournament_seed,
        right_handed: right_handed,
        singles_in: singles_in,
        doubles_in: doubles_in,
      },
    },
    { new: true }
  )
    .then((player) => {
      console.log("updated player:");
      console.log(player);
      res.status(200).json({ player });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
