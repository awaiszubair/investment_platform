const express = require('express');
const routes = express.Router();
const db = require('../db/db');

// Authorizing
routes.post('/', (req, res) => {
    const { user } = req.body
    console.log(user.email);
    const query1 = 'SELECT * FROM users WHERE email = ?';
    db.query(query1, [user.email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            const query2 = "INSERT into USERS (email) values(?)"
            db.query(query2, [user.email], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ error: 'Internal Server Error' })
                }
                else {
                    return res.status(200).json({ msg: 'Data inserted Successfully' })
                }
            })
        }
    });

    console.log(user);
    // return res.status(201).json({ msg: 'Data sended successfully' })
    // IF User Registered then fetch data from db and retrieve
    // ELSE register the data and then fetch from db

})

module.exports = routes