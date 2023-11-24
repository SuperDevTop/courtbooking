const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
const http = require("http");

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  },
});

require("dotenv").config();

// mongoose.connect('mongodb://127.0.0.1:27017/tennis_court_booking', {
mongoose
  .connect(
    "mongodb+srv://ctori0816:QwBaTtsIJcRJLTOM@cluster0.psaminp.mongodb.net/tennis_court_booking",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/player", require("./routes/players"));
app.use("/api/booking", require("./routes/booking"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/court", require("./routes/court"));
app.use("/api/chat", require("./routes/chat"));

app.use("/images", express.static(path.join(__dirname, "images")));

// Your code
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}
// Your code

const users = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join", (data) => {
    const { name } = data;
    console.log(name + ' joined');
    users[name] = socket.id;
  });

  socket.on("disconnect", () => {
    // Clean up the users object on disconnect
    const username = Object.keys(users).find((key) => users[key] === socket.id);

    if (username) {
      delete users[username];
      console.log(`${username} disconnected`);
    }
  });

  socket.on("privateMessage", (data) => {
    const { receiver } = data;
    const toSocketId = users[receiver];
    if (toSocketId) {
      io.to(toSocketId).emit("message", (data));
    } else {
      // Handle if the user is not found
      console.log(`User ${receiver} not found`);
    }
  });
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
