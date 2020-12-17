const express = require("express");

const accoutnsAPI = require("./apiRoutes/accounts");

const server = express();

server.use(express.json());

server.use("/api/accounts", accoutnsAPI);

module.exports = server;
