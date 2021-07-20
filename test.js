const http = require("http");
const fs = require("fs");
// const express = require("express");

const getRandomBirth = () => {
  let day, month, year;
  day = Math.round(Math.random() * 30);
  month = Math.round(Math.random() * 12);
  year = Math.round(Math.random() * 100 + 1920);

  if (day < 10) day = `0${day}`;
  if (month < 10) month = `0${month}`;

  return `${day}-${month}-${year}`;
};

let db = Array(50)
  .fill(0)
  .map((val, index) => ({
    id: index,
    name: `user number ${index}`,
    gender: index % 2 == 0 ? "male" : "female",
    birth: getRandomBirth(),
  }));


http
  .createServer(


    (req, res) => {
    let data;
    let url = req.url.split("/").slice(1);



    //for CORS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Max-Age": 2592000, // 30 days
      /** add other headers as per requirement */
    };

    Object.keys(headers).forEach((val) => {
      res.setHeader(val, headers[val]);
    });
    //


//app.get(callback);

    if (req.url.includes("all")) {
      if (req.method != "GET") {
        res.statusCode = 400;
        return res.end("Bad request");
      } else {
        let rawQueries = req.url.split("?")[1];
        if (!rawQueries) {
          res.setHeader("Content-Type", "application/json");
          return res.end(
            JSON.stringify(db.sort((val1, val2) => val1.id - val2.id))
          );
        }
        let parseQueries = {};
        rawQueries.split(/&+/).forEach((val) => {
          let temp = val.split(/=+/);
          parseQueries[temp[0]] = temp[1];
        });

        if (parseQueries.sort) {
          switch (parseQueries.sort) {
            case "id":
              res.setHeader("Content-Type", "application/json");
              return res.end(
                JSON.stringify(db.sort((val1, val2) => val1.id - val2.id))
              );
            case "name":
              res.setHeader("Content-Type", "application/json");
              return res.end(
                JSON.stringify(
                  db.sort((val1, val2) => val1.name[0] > val2.name[0])
                )
              );
            case "gender":
              res.setHeader("Content-Type", "application/json");

              return res.end(
                JSON.stringify(
                  db.sort(
                    (val1, val2) => val1.gender.length - val2.gender.length
                  )
                )
              );
            default:
              res.setHeader("Content-Type", "application/json");
              return res.end(
                JSON.stringify(db.sort((val1, val2) => val1.id - val2.id))
              );
          }
        } else {
          res.setHeader("Content-Type", "application/json");
          return res.end(
            JSON.stringify(db.sort((val1, val2) => val1.id - val2.id))
          );
        }
      }
    } else if (url[0] == "info") {
      if (req.method != "GET") {
        res.statusCode = 400;
        return res.end("Bad request");
      } else {
        let id = url[1].split("?")[0];
        try {
          let newId = parseInt(id);
          let result = db.find((val) => val.id == newId);

          if (result) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
          } else {
            res.statusCode = 400;
            res.end("No reference");
          }
        } catch (error) {
          res.statusCode = 400;
          console.log(error.message);
          res.end("Some thing wrong");
        }
      }
    } else if (url[0] == "change") {
      if (req.method != "POST") {
        res.statusCode = 400;
        return res.end("Bad request");
      } else {
        let id = url[1].split("?")[0];
        let data = Buffer.alloc(0);
        try {
          let result = db.findIndex((val) => val.id == id);
          req.on("data", (val) => {
            data = Buffer.concat([data, val]);
          });

          req.on("end", () => {
            if (data.length == 0) {
              return res.end("Done. But nothing change");
            }

            try {
              data = JSON.parse(data.toString());
              let validatedData = {};
              if (data.id) {
                res.statusCode = 400;
                return res.end("Cannot change this");
              }

              if (data.name) {
                validatedData.name = data.name;
              }
              if (data.gender) {
                validatedData.gender = data.gender;
              }
              if (data.birth) {
                validatedData.birth = data.birth;
              }
              db[result] = { ...db[result], ...validatedData };
              res.end("Done");
            } catch (error) {
              res.statusCode = 400;
              res.end(error.message);
            }
          });
        } catch (error) {
          res.statusCode = 400;
          console.log(error.message);
          res.end("Some thing wrong");
        }
      }
    } else if (url[0] == "video") {
      res.setHeader("Content-Type", "	video/mp4");
      fs.createReadStream("video.mp4").pipe(res);
      
    } else {
      res.statusCode = 400;
      res.end("No such request");
    }
  }
  
  
  )
  .listen(3000);

//info/:id? sort = ?? get
//all sort = ?? get
//change/:id post
