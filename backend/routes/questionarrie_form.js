const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middlwares/auth');
const db = require('../db/db');
const routes = express.Router();

// @Post form data using post request
routes.post('/',(req,res)=>{
    const {user, formData} = req.body
    if(user && formData){
        const query1 = "INSERT INTO form (data, email) VALUES (?, ?)";
        db.query(query1, [formData, user.email], (err, result) => {
            if (err) {
                console.error(err.message);
                return res.status(400).json({ error: err.message });
            } else {
                return res.status(200).json({ msg: 'Data inserted successfully' });
            }
        });
    } else {
        return res.status(400).json({ error: 'Missing user or formData' });
    }
    
    console.log("Form Data is: ",formData);
    console.log('User Data is: ',user);
})

routes.post('/data', (req, res) => {
    const { token } = req.body;
    const sanitizedToken = token.replace(/\./g, '-');
    console.log("TOKEN: ", token);

    const query1 = "SELECT * FROM form WHERE id = ?";
    db.query(query1, [token], (err, result) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(400).json({ error: "Database Error" });
        }

        if (result.length > 0) {
            const data = result[0];
            return res.status(200).json({ data });
        } else {
            return res.status(400).json({ error: 'No Result Found' });
        }
    });

    // try {
    //      jwt.verify(String(sanitizedToken), process.env.JWTSECRET,(err,token)=>{
    //         if (err) {
    //             console.log(err)
    //             return res.status(400).json({message:'Invalid Token'})
    //         }
    //         console.log("Decoded Token: ", token);

    //         const query1 = "SELECT * FROM form WHERE id = ?";
    //         db.query(query1, [token.id], (err, result) => {
    //             if (err) {
    //                 console.error("Database Error:", err.message);
    //                 return res.status(400).json({ error: "Database Error" });
    //             }
    
    //             if (result.length > 0) {
    //                 const data = result[0];
    //                 return res.status(200).json({ data });
    //             } else {
    //                 return res.status(400).json({ error: 'No Result Found' });
    //             }
    //         });
    //     });
       
    // // } catch (error) {
    // //     console.error("JWT Verification Error:", error.message);
    // //     return res.status(400).json({ error: "JWT Verification Error" });
    // // }

   
});


routes.get('/data/:id',(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const query1 = "Select client_data from form where id = ?"
    db.query(query1,[id],(err,result)=>{
        if (err) {
            console.log(err)
            return res.status(400).json({err})
        }
        console.log(result);
        return res.status(200).json(result)
    })
})

routes.get('/broker',(req,res)=>{
    const query1 = "Select * from form";
    db.query(query1,(err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).json({err})
        }
        console.log("The result is: "+result)
        return res.status(200).json({result})
    })
})



module.exports = routes;







































// routes.post('/', auth, (req, res) => {
    //     const config = req.body;
    //     if (!config) return res.status(400).json({ error: "Config data is missing" });
    
    //     const configData = JSON.stringify(config);
    //     const { id } = req.user;
    
    //     const query = `INSERT INTO Configuration (data, userId) VALUES (?, ?)`;
    //     const query2 = `INSERT INTO request (userId) VALUES (?)`;
    
    //     db.query(query, [configData, id], (err, result) => {
    //         if (err) {
    //             console.error("Error inserting configuration data:", err);
    //             return res.status(500).json({ error: "Internal server error" });
    //         }
    //         // If you want to execute query2 after query1, you should place it inside the callback
    //         db.query(query2, [id], (err, result) => {
    //             if (err) {
    //                 console.error("Error inserting request data:", err);
    //                 return res.status(500).json({ error: "Internal server error" });
    //             }
    //             res.status(201).json({ msg: "Configuration data inserted Successfully" });
    //         });
    //     });
    // });
    
    
    
    // // @Get Form Data of Specific User
    // routes.get('/user/:email', auth, (req, res) => {
    //     const { id } = req.user;
    //     const { email } = req.params;
    
    //     const query1 = `SELECT role FROM users WHERE UserID = ${id}`;
    //     db.query(query1, (err, result) => {
    //         if (err) {
    //             console.error("Error querying database: ", err);
    //             return res.status(500).json({ error: 'Internal Server Error' });
    //         }
    //         if (result.length > 0 && result[0].role === 1) {
    //             const query2 = `SELECT UserID FROM users WHERE email = '${email}'`;
    //             db.query(query2, (err, userResult) => {
    //                 if (err) {
    //                     console.error("Error querying database: ", err);
    //                     return res.status(500).json({ error: 'Internal Server Error' });
    //                 }
    //                 if (userResult.length > 0) {
    //                     const userId = userResult[0].UserID;
    //                     console.log("User email found: ", userResult[0].UserID);
    //                     // const query3 = `SELECT c.data FROM Configuration c INNER JOIN Request ON Request.userId = '${userId}' WHERE Request.userId = '${userId}' LIMIT 1`;
    //                     const query3 = `SELECT c.data FROM Configuration c INNER JOIN Request r ON c.userId = r.userId WHERE r.userId = '${userId}' LIMIT 1`;
    
    //                     db.query(query3, (err, configResult) => {
    //                         if (err) {
    //                             console.error("Error querying database: ", err);
    //                             return res.status(500).json({ error: 'Internal Server Error' });
    //                         }
    //                         if (configResult.length > 0) {
    //                             return res.status(200).json(configResult[0].data);
    //                         } else {
    //                             return res.status(404).json({ error: 'Data not found for the specified user' });
    //                         }
    //                     });
    //                 } else {
    //                     return res.status(404).json({ error: 'User not found with the specified email' });
    //                 }
    //             });
    //         } else {
    //             return res.status(403).json({ error: 'Unauthorized' });
    //         }
    //     });
    // });
    
    
    
    
    
    // routes.get('/user/link/:userId', auth, (req, res) => {
    //     const { id } = req.user;
    //     const brokerId = id
    //     const { userId } = req.params;
    //     try {
    //         console.log('userID', userId);
    //         const decoded = jwt.verify(userId, process.env.JWTSECRET);
    //         req.user = decoded.user
    //         const { id } = req.user;
    //         console.log("The mainID is: ", id);
    //         const query1 = `SELECT role FROM users WHERE UserID = ${brokerId}`;
    //         db.query(query1, (err, result) => {
    //             if (err) {
    //                 console.error("Error querying database: ", err);
    //                 return res.status(500).json({ error: 'Internal Server Error' });
    //             }
    
    //             // Check if user has the necessary role
    //             if (result.length === 0 || result[0].role !== 1) {
    //                 return res.status(403).json({ error: 'Forbidden' }); // Return Forbidden if user doesn't have the required role
    //             }
    
    //             // const query3 = `SELECT c.data FROM Configuration c INNER JOIN Request r ON c.userId = r.userId WHERE r.userId = '${id}' LIMIT 1`;
    //             const query3 = `SELECT data FROM Configuration WHERE userId = '${id}' LIMIT 1`;
    
    
    //             db.query(query3, (err, configResult) => {
    //                 if (err) {
    //                     console.error("Error querying database: ", err);
    //                     return res.status(500).json({ error: 'Internal Server Error' });
    //                 }
    //                 if (configResult.length > 0) {
    //                     return res.status(200).json(configResult[0].data);
    //                 } else {
    //                     return res.status(404).json({ error: 'Data not found for the specified user' });
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         console.error(error.message);
    //         res.status(401).json({ msg: 'Invalid token' });
    //     }
    // });
    

