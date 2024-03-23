const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db/db');



routes.post('/', (req, res) => {
    const { id, user, formData } = req.body;
    const query1 = 'INSERT INTO form (id, data, email) values(?, ?, ?)'
    console.log(id, user.email, formData);
    db.query(query1, [id, formData, user.email], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(400).json(err)
        }
        const payload = {
            id: id,
        }
        return res.status(200).json({ id })
        // jwt.sign(
        //     payload,
        //     process.env.JWTSECRET || 'mySecretKey',
        //     {
        //         expiresIn: 3600000,
        //     },
        //     (err, token) => {
        //         if (err) throw err.message;
        //         res.json({ token });
        //     }
        // );
    })
})

routes.put('/', (req, res) => {
    const { id, data2 } = req.body;
    const query1 = 'Update form set client_data = ?, update_status = ? where id = ?'
    db.query(query1, [data2, 's', id], (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ err })
        }
        return res.status(200).json({ msg: true })
    })
})

routes.get('/:email', (req, res) => {
    const { email } = req.params;
    const query1 = "Select * from form where email = ?"
    db.query(query1, [email], (err, result) => {
        if (err) {
            return res.status(400).json({ err })
        }
        const data = result
        return res.status(200).json(data)
    })
})

module.exports = routes