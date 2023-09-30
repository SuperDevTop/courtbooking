const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')

// mongoose.connect('mongodb://127.0.0.1:27017/tennis_court_booking', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
mongoose.connect('mongodb+srv://ctori0816:QwBaTtsIJcRJLTOM@cluster0.psaminp.mongodb.net/tennis_court_booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log(err))

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/player', require('./routes/players'));
app.use('/api/booking', require('./routes/booking'));

// Your code
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
}
// Your code


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));


