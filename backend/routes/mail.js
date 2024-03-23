const express = require('express');
const multer = require('multer');
const fs = require('fs');
const nodemailer = require('nodemailer');
const auth = require('../middlwares/auth');
const db = require('../db/db');

const routes = express.Router();

const upload = multer({ dest: 'uploads/' });

// Configure nodemailer with your email service provider
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
    auth: {
        user: 'kickart11@gmail.com',
        pass: 'iccj tbvg xzlg xckt'
    },
});

routes.post('/broker', auth, upload.single('pdfFile'), (req, res) => {
    const { path, originalname } = req.file;
    const jsonData = JSON.parse(req.body.userData);
    const email = JSON.parse(req.body.email)
    console.log("The email is: ", email);
    console.log("The user Data is", jsonData[0].userType);
    // Read the uploaded PDF file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.error('Error reading PDF file:', err);
            return res.status(500).send('Error processing PDF file');
        }

        // Send email with the PDF file attached
        transporter.sendMail({
            from: 'kickart11@gmail.com',
            to: 'awaiszubair512@gmail.com',
            subject: 'Pdf Document',
            text: `Here is your summarized document`,
            attachments: [
                {
                    filename: originalname,
                    content: data,
                },
            ],
        }, (emailErr, info) => {
            if (emailErr) {
                console.error('Error sending email:', emailErr);
                return res.status(500).send('Error sending email');
            }

            console.log('Email sent:', info.response);

            const query = `SELECT UserID from users where email = ?`
            // Insert data into the database
            const query1 = `INSERT INTO PROFILES (UserID, EmploymentStatus, FinancialAssets, FinancialLiabilities) 
            Values (?, ?, ?, ?)`;
            const query2 = `INSERT INTO INVESTMENTS (UserID, Type, Amount, StartDate, EndDate, RiskLevel, Goal) 
            Values (?, ?, ?, ?, ?, ?, ?)`;
            db.query(query, [email], (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    return res.status(500).send('Error executing SQL query');
                }
                if (result.length === 0) {
                    return res.status(404).send('User not found'); // Handle the case where no user is found with the provided email
                }

                const userID = result[0].UserID;

                db.query(query1, [userID, jsonData[0].employementStatus, jsonData[0].financialStatus, jsonData[0].financialLiabilities], (err, result) => {
                    if (err) {
                        console.error('Error inserting into PROFILES:', err);
                        return res.status(500).send('Error inserting into PROFILES');
                    }

                    db.query(query2, [userID, jsonData[1].type, jsonData[1].amount, jsonData[1].startDate, jsonData[1].endDate, jsonData[1].riskLevel, jsonData[1].goal], (err) => {
                        if (err) {
                            console.error('Error inserting into INVESTMENTS:', err);
                            return res.status(500).send('Error inserting into INVESTMENTS');
                        }
                        console.log("Data inserted successfully");
                        return res.json('Data inserted successfully');
                    });
                });
            });



        });
    });
})

routes.post('/', auth, upload.single('pdfFile'), (req, res) => {
    const { path, originalname } = req.file;
    const jsonData = JSON.parse(req.body.userData);
    console.log("The user Data is", jsonData[0].userType);
    const { id } = req.user;
    // Read the uploaded PDF file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.error('Error reading PDF file:', err);
            return res.status(500).send('Error processing PDF file');
        }

        // Send email with the PDF file attached
        transporter.sendMail({
            from: 'kickart11@gmail.com',
            to: 'awaiszubair512@gmail.com',
            subject: 'Pdf Document',
            text: `Here is your summarized document`,
            attachments: [
                {
                    filename: originalname,
                    content: data,
                },
            ],
        }, (emailErr, info) => {
            if (emailErr) {
                console.error('Error sending email:', emailErr);
                return res.status(500).send('Error sending email');
            }

            console.log('Email sent:', info.response);

            // Insert data into the database
            const query1 = `INSERT INTO PROFILES (UserID, EmploymentStatus, FinancialAssets, FinancialLiabilities) 
            Values (?, ?, ?, ?)`;
            const query2 = `INSERT INTO INVESTMENTS (UserID, Type, Amount, StartDate, EndDate, RiskLevel, Goal) 
            Values (?, ?, ?, ?, ?, ?, ?)`;

            db.query(query1, [id, jsonData[0].employementStatus, jsonData[0].financialStatus, jsonData[0].financialLiabilities], (err, result) => {
                if (err) {
                    console.error('Error inserting into PROFILES:', err);
                    return res.status(500).send('Error inserting into PROFILES');
                }

                db.query(query2, [id, jsonData[1].type, jsonData[1].amount, jsonData[1].startDate, jsonData[1].endDate, jsonData[1].riskLevel, jsonData[1].goal], (err) => {
                    if (err) {
                        console.error('Error inserting into INVESTMENTS:', err);
                        return res.status(500).send('Error inserting into INVESTMENTS');
                    }

                    return res.json('Data inserted successfully');
                });
            });
        });
    });
});

module.exports = routes