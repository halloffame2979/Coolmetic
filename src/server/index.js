const socketIo = require("socket.io");

const express = require("express");

const app = express();
app.get("/", (req, res) => {
    res.end("Hello world");
});

const http = require("http");


const server = http.createServer(app).listen(3000, () => console.log("ok"));
const socketIOServer = new socketIo.Server(server);
socketIOServer.on("connection", (io) => {
    console.log(io.id)
});
// socketIo.Server()
