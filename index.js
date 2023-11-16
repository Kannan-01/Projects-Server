// Loads .env file content into process.env by default
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require('./Routes/router')
require('./DB/connection')

// create express application
const projectServer = express();

projectServer.use(cors());
// convert json to js
projectServer.use(express.json());
projectServer.use(router)
const PORT = 4000 || process.env.PORT;

projectServer.listen(PORT, () => {
  console.log(
    `Project Server Started At Port : ${PORT} and waiting for client requests !!!`
  );
});
// http get request resolving to http://localhost:4000/
projectServer.get("/", (req, res) => {
  res.send(
    `<h1>Project Server Started At Port : ${PORT} and waiting for client requests !!!</h1>`
  );
});
