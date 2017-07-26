const mysql = require('mysql');
// connection configurations
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 't00r',
    database: 'testDb'
});
// connect to database
sql.connect();

module.exports = sql;
