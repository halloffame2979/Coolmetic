const http = require("http");
const { fork } = require("child_process");
http
  .createServer((req, res) => {
    let index = req.url.indexOf("name");
    let name;
    if (index < 0) name = "anonymous";
    else name = req.url.slice(index + 5);
    // Fork another process
    const child_process = fork("./parallelProcess.js");

    // Data we may need to send to the child process
    const data = {};

    // Send the data to forked process
    if (index >= 0 || req.url == "/")
      child_process.send({ data: name }, function () {
        //   console.log("Sending data");
      });

    child_process.on("message", (mss) => {
      res.end(mss.message);
    });

    // Listen to forked process
    child_process.on("close", (result) => {
    //   console.log("Close");
    });
    child_process.on("exit", (result) => {
    //   console.log("Exit");
    });
  })
  .listen(3000);
