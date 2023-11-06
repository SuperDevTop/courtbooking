const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "Unregistered User",
      });
    } else {
      // check password
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          res.status(401).json({ message: error });
        } else if (isMatch) {
          console.log(user.email + "Login success");

          // Create and sign a JWT token
          const token = jwt.sign({ id: user._id }, "secretKey", {
            expiresIn: 1800,
          });

          User.find({})
            .then((users) => {
              res.status(200).json({ token, user, users });
            })
            .catch((err) => {
              res.status(400).json({ message: err.response.data });
            });
        } else {
          // Passwords do not match, user is not authenticated
          console.log("Incorrect password");
          res.status(400).json({ message: "Wrong password" });
        }
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
});

router.post("/updatePassword", async (req, res) => {
  const { newPassword, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  User.updateOne(
    { email: email },
    {
      $set: {
        password: hashedPassword,
      },
    }
  )
    .then(() => {
      res
        .status(200)
        .json({ message: "The passwrd has been updated successfully!" });
      console.log("The password has been updated successfully!");
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/updateUser", async (req, res) => {
  const { name, email, role, phone } = req.body;
  console.log(phone);

  User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        name: name,
        phone: phone,
        role: role,
      },
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

module.exports = router;
