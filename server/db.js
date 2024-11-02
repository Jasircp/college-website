const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Jasir@123",
    host: "localhost",
    port: "5432",
    database: "college"
});

module.exports = pool;