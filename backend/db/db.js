// const mySql = require("mysql");
// const db = mySql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'investmentPlatform'
// })
// db.connect((err) => {
//     if (err) {
//         throw err
//     }
//     console.log("Mysql Connected...");
// })

// module.exports = db;

const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const db = new Sequelize('investmentPlatform', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Use 'mysql' for MariaDB
});


module.exports = db