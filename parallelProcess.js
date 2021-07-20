// Do any work in parallel to main
// event loop or main process
// console.log("Child Process Starts");

process.on("message", (mss) => {
  let now = new Date();
    while (new Date() - now < 5000) {}
  process.send({ message: `Hello ${mss.data}` });
  process.exit();
});
