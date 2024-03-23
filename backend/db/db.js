const mySql = require("mysql");
const db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'investmentPlatform'
})
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("Mysql Connected...");
})

module.exports = db;