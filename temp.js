const fs = require("fs");

fs.readFile("text.txt", (err, data) => {
  if (err) return;

  setTimeout(() => {
    console.log("timeOut");
  }, 0);

  setImmediate(() => {
    console.log("imme");
  });
});
