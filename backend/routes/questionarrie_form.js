const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middlwares/auth');
const Form = require('../models/Form'); // Import the Form model
const routes = express.Router();

// @Post form data using post request
// routes.post('/',(req,res)=>{
//     const {user, formData} = req.body
//     if(user && formData){
//         const query1 = "INSERT INTO form (data, email) VALUES (?, ?)";
//         db.query(query1, [formData, user.email], (err, result) => {
//             if (err) {
//                 console.error(err.message);
//                 return res.status(400).json({ error: err.message });
//             } else {
//                 return res.status(200).json({ msg: 'Data inserted successfully' });
//             }
//         });
//     } else {
//         return res.status(400).json({ error: 'Missing user or formData' });
//     }

//     console.log("Form Data is: ",formData);
//     console.log('User Data is: ',user);
// })

routes.post('/', async (req, res) => {
    try {
        const { user, formData } = req.body;
        if (!user || !formData) {
            return res.status(400).json({ error: 'Missing user or formData' });
        }

        await Form.create({
            data: formData,
            email: user.email
        });

        return res.status(200).json({ msg: 'Data inserted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
});


// routes.post('/data', (req, res) => {
//     const { token } = req.body;
//     const sanitizedToken = token.replace(/\./g, '-');
//     console.log("TOKEN: ", token);

//     const query1 = "SELECT * FROM form WHERE id = ?";
//     db.query(query1, [token], (err, result) => {
//         if (err) {
//             console.error("Database Error:", err.message);
//             return res.status(400).json({ error: "Database Error" });
//         }

//         if (result.length > 0) {
//             const data = result[0];
//             return res.status(200).json({ data });
//         } else {
//             return res.status(400).json({ error: 'No Result Found' });
//         }
//     });
// });


routes.post('/data', async (req, res) => {
    try {
        const { token } = req.body;
        const form = await Form.findOne({ where: { id: token } });

        if (form) {
            return res.status(200).json({ data: form });
        } else {
            return res.status(400).json({ error: 'No Result Found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
});

// routes.get('/data/:id',(req,res)=>{
//     const {id} = req.params;
//     console.log(id)
//     const query1 = "Select client_data from form where id = ?"
//     db.query(query1,[id],(err,result)=>{
//         if (err) {
//             console.log(err)
//             return res.status(400).json({err})
//         }
//         console.log(result);
//         return res.status(200).json(result)
//     })
// })


routes.get('/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const form = await Form.findOne({ where: { id }, attributes: ['client_data'] });

        if (form) {
            return res.status(200).json(form.client_data);
        } else {
            return res.status(400).json({ error: 'No Result Found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
});


// routes.get('/broker',(req,res)=>{
//     const query1 = "Select * from form";
//     db.query(query1,(err,result)=>{
//         if(err){
//             console.log(err)
//             return res.status(400).json({err})
//         }
//         console.log("The result is: "+result)
//         return res.status(200).json({result})
//     })
// })


routes.get('/broker', async (req, res) => {
    try {
        const forms = await Form.findAll();
        return res.status(200).json(forms);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
});


module.exports = routes;




































