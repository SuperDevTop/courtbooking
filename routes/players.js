const express = require('express')
const router = express.Router()

const Player = require('../models/players')

router.get('/getPlayersData', async(req, res) => {
    try {
        const players = await Player.find({  });
        
        res.status(200).json({ players });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router