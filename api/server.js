const express = require("express");
const server = express();
const teamsRouter = require("../teams/teams-router");

server.use(express.json());
server.use("/teams", teamsRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: "up" });
})

module.exports = server;