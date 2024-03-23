const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
const router = express.Router();




// @Post userLogin
router.post('/', [
    check('email', 'Enter valid email address').isEmail(),
    check('password', 'Please enter password with minimum length 6').exists(),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        console.log(result.array());
        return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;
    console.log("The password is: ", password)
    try {
        db.query("SELECT * FROM users WHERE email = ? ", [email], function (err, results) {
            if (err) {
                console.log(err)
                return err
            }
            if (results.length === 0) {
                return res.status(400).json({ msg: 'Wrong Username or Password' })
            }
            console.log(results.password);
            const isMatch = bcrypt.compare(password, results[0].Password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Password Incorrect' });
            }
            const payload = {
                user: {
                    id: results[0].UserID
                }
            };
            jwt.sign(
                payload,
                process.env.JWTSECRET || 'mySecretKey',
                {
                    expiresIn: 3600000,
                },
                (err, token) => {
                    if (err) throw err.message;
                    res.json({ token, msg: "Login Successful" });
                }
            );
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
