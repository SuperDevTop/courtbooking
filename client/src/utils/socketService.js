import { io } from "socket.io-client";

let backendUrl = "http://localhost:5000";

if (process.env.NODE_ENV !== "development") {
  backendUrl = "/";
}
// let backendUrl = "https://courtbooking.vercel.app";
const socket = io(backendUrl);
const user = JSON.parse(localStorage.getItem("user"));

export const initiateSocketConnection = () => {
  //   socket = io(backendUrl);
  console.log(`Connecting socket...`);

  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  })

  socket.emit("join", { name: user.name });
  console.log('joining...');

};

const sendMessage = (data) => {
  socket.emit("privateMessage", data);
};

export { socket, sendMessage };
