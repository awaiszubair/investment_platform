const express = require('express');
const jwtCheck = require('./middlwares/auth');
const cors = require('cors');
const db = require('./db/db');
require('dotenv').config();

console.log(process.env.JWTSECRET);

const app = express();

app.use(express.json({ extended: false }))
app.use(cors());

// 0auth
app.use('/api/0auth', require('./routes/0auth'))

app.get('/', (req, res) => {
    res.json({ msg: 'Acknowledged' })
})

// user
app.use('/api/submit', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));

// form
app.use('/api/form', require('./routes/questionarrie_form'));

// mail
app.use('/api/mail', require('./routes/mail'));


// Link
app.use('/api/link', require('./routes/Link'));

async function testConnection() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(3000, () => {
            console.log("App is listening on port: ", 3000);
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();





