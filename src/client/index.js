const io = require('socket.io-client');
const socket = io('http://localhost:3000')
const express = require("express");

// const app = express();
// app.get("/", (req, res) => {
//     res.end("Hello world");
// });

// const http = require("http");


// const server = http.createServer(app).listen(3001, () => console.log("ok"));
// const socketIOServer = new socketIo.Server(server);

socket.io.on('connected', (data) => {
    console.log('ok',data);
})
// socketIo.Server()
