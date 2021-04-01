#!/usr/bin/env node
"use strict";

//one
// const tutorial = require("./mymath");
// console.log(tutorial.sum(1, 4));
// console.log(tutorial.PI);
// console.log(new tutorial.SomeMathObject());

//two
// const EventEmitter = require("events");
// const eventEmitter = new EventEmitter();

// eventEmitter.on("tutorial", (num1, num2) => {
//   console.log(num1 + num2);
// });

// eventEmitter.emit("tutorial", 1, 2);

// class Person extends EventEmitter {
//   constructor(name) {
//     super();
//     this._name = name;
//   }

//   get name() {
//     return this._name;
//   }
// }

// let pedro = new Person("Pedro");
// let christina = new Person("Christina");
// pedro.on("name", () => {
//   console.log("my name is " + pedro.name);
// });
// christina.on("name", () => {
//   console.log("my name is ", christina.name);
// });

// pedro.emit("name");
// christina.emit("name");

//three
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let num1 = Math.floor(Math.random() * 10 + 1);
// let num2 = Math.floor(Math.random() * 10 + 1);

// let answer = num1 + num2;

// rl.question(`what is ${num1} + ${num2}?\n`, (userInput) => {
//   if (userInput.trim() == answer) {
//     rl.close();
//   } else {
//     rl.setPrompt("Incorrect response please try again\n");
//     rl.prompt();
//     rl.on("line", (userInput) => {
//       if (userInput.trim() == answer) {
//         rl.close();
//       } else {
//         rl.setPrompt("Your answer of ${userInput} is incorrect try again\n");
//         rl.prompt();
//       }
//     });
//   }
// });

// rl.on("close", () => {
//   console.log("Correct!");
// });

//four
// const fs = require("fs");
// fs.writeFile("example.txt", "this is an example", (err) => {
//   if (err) console.log(err);
//   else {
//     console.log("file successfulyy created");
//     fs.readFile("example.txt", "utf-8", (err, file) => {
//       if (err) console.log(err);
//       else console.log(file);
//     });
//   }
// });

// fs.rename("example.txt", "example2.txt", (err) => {
//   if (err) console.log(err);
//   else console.log("rename successfully");
// });

// fs.appendFile("example2.txt", "some data being appended", (err) => {
//   if (err) console.log(err);
//   else {
//     console.log("appended successfully");
//   }
// });

// fs.unlink("example2.txt", (err) => {
//   if (err) console.log(err);
//   else console.log("successfully deleted file");
// });

//six
// const fs = require("fs");
// const readStream = fs.createReadStream("./example.txt", "utf-8");
// const writeStream = fs.WriteStream("./example2.txt");
// readStream.on("data", (chunk) => {
//   console.log(chunk);
//   writeStream.write(chunk);
// });

//seven
// const fs = require("fs");
// const zlib = require("zlib");

// const gzip = zlib.createGzip();
// const gunzip = zlib.createGunzip();
// const readStream = fs.createReadStream("./example.txt", "utf-8");
// const writeStream = fs.WriteStream("./example2.txt.gz");
// readStream.pipe(writeStream);
// readStream.pipe(gzip).pipe(gunzip).pipe(writeStream);

//eight
// const http = require("http");
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("hello world from nodejs!");
//     res.end();
//   } else {
//     res.write("using some other domain");
//     res.end();
//   }
// });

// server.listen("3000");

//nine
// const http = require("http");
// const fs = require("fs");

// http
//   .createServer((req, res) => {
//     const readStream = fs.createReadStream("../static/index.html");
//     res.writeHead(200, { "Content-Type": "text/html" });
//     readStream.pipe(res);
//   })
//   .listen(3000);

// ten
// const _ = require("lodash");
// let example = _.fill([1, 2, 3, 4, 5], "banana", 1, 4);
// console.log(example);

// eleven
// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.listen(3000);

// twelve
// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("hitting example route");
//   console.log(req.params.name + " : " + req.params.age);
// });

// app.get("/example/:name/:age", (req, res) => {
//   console.log(req.params);
//   console.log(req.query);
//   res.send(req.params.name + ":" + req.params.age);
// });

// app.listen(3000);

// thirteen
// const express = require("express");
// const path = require("path");
// const bodyParser = require("body-parser");

// const app = express();

// app.use("/public", express.static(path.join(__dirname, "static")));
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "static", "index.html"));
// });

// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("successfully posted data");
// });

// app.listen(3000);

// fourteen
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Joi = require("joi");
const app = express();

app.use("/public", express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.post("/", (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(10),
  });
  console.log(req.body);
  try {
    schema.validate(req.body);
  } catch (err) {
    console.log(err);
    res.send("an error has occurred");
  }
  res.send("successfully posted data");
});

app.listen(3000);
