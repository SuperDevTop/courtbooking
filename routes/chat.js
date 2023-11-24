const express = require("express");
const router = express.Router();

const Chat = require("../models/chat");

router.post("/getChatContents", async (req, res) => {
  try {
    const { username } = req.body;

    const chatContents = await Chat.find({
      $or: [{ sender: username }, { receiver: username }],
    });

    res.status(200).json({ chatContents });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
