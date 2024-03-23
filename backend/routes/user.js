const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
const auth = require('../middlwares/auth');
const router = express.Router();

// @Get userData where uid
router.get('/uid/:uid', async (req, res) => {
    const { uid } = req.params
    console.log(uid);
    try {
        const users = await db.query('SELECT * FROM users WHERE uid = ?', [uid]);
        console.log(users);
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @Post userRegistration
router.post('/', [
    check('username', 'Enter valid username').not().isEmpty(),
    check('fullName', 'Enter valid name').not().isEmpty(),
    check('email', 'Enter valid email address').isEmail(),
    check('password', 'Please enter password with minimum length 6').isLength({ min: 6 }),
    check('dateOfBirth', 'Please enter date of birth').not().isEmpty(),
    check('nationality', 'Nationality is required').not().isEmpty(),
    check('govtId', 'Government ID is required').not().isEmpty()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        console.log(result.array());
        return res.status(400).json({ errors: result.array() });
    }

    const { username, fullName, email, password, dateOfBirth, nationality, govtId } = req.body;
    try {
        db.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username], (err, results) => {
            const errors = [];
            if (err) {
                return res.json({ msg: err })
            }
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const registrationDate = new Date(); // Assuming registration date is current date and time

        db.query(
            'INSERT INTO users (username, fullName, email, password, dateOfBirth, nationality, GovernmentId, registrationDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [username, fullName, email, hashedPassword, dateOfBirth, nationality, govtId, registrationDate], (err) => {
                if (err) {
                    return res.status(400).json(err)
                }
            })

        // user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        user = db.query('SELECT * From users WHERE email = ? ', [email], function (err, results) {
            if (err) {
                throw err
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
                    res.json({ token, msg: "Registration Successful" });
                }
            );

        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/userdata', auth, (req, res) => {
    const query = `
        SELECT p.EmploymentStatus, p.AnnualIncome, i.Type
        FROM profiles p
        INNER JOIN investments i ON p.UserID = i.UserID
        WHERE p.UserID = ?`;

    const userId = req.user.id; // Assuming you have the user ID stored in req.user.id after authentication

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Error executing SQL query');
        }

        res.json(result); // Assuming you want to send the result as JSON
    });
});


module.exports = router;
