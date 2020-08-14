const knex = require("knex");
require("dotenv").config();

const config = require("../knexfile");

const environment = process.env.DB_ENV;

console.log("environment", environment);

module.exports = knex(config[environment]);