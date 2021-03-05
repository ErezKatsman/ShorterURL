require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const database = require("./Routes/DBroutes");

app.use(cors());

app.set("view engine", "pug");

app.use("/API/shorterURL", database);

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
