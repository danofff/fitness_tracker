// build and export your unconnected client here

const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URL);

module.exports = { client };
