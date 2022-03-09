// create the express server here
require("dotenv").config();
const path = require("path");

const { PORT = 8000 } = process.env;
const express = require("express");
const server = express();
server.use(express.json());

const cors = require("cors");
server.use(cors());
const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.static(path.join(__dirname, "public")));

//add router
const router = require("./api");
server.use("/api", router);

server.use((req, res, next) => {
  console.log("wild card is working");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const { client } = require("./db/client");
client.connect();

server.listen(PORT, () => {
  console.log("server is runnig on ", PORT);
});
