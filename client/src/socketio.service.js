import { io } from "socket.io-client";

let socket;
let backendUrl = "http://localhost:5000";

export const initiateSocketConnection = () => {
  socket = io(backendUrl);
  console.log(`Connecting socket...`);

  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  socket.on("message", (data) => {
    console.log(data);
  });

  sendMessage({ msg: "hi" });
};

export const sendMessage = (data) => {
  socket.emit("sendMessage", data);
};
