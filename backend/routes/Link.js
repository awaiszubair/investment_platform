const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db/db');
const Form = require('../models/Form');

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage })

// routes.post('/', upload.fields([{ name: 'c_pfile', maxCount: 1 }, { name: 'c_cfile', maxCount: 1 }, { name: 'c_ifile', maxCount: 1 },
// { name: 'b_pfile', maxCount: 1 }, { name: 'b_cfile', maxCount: 1 }, { name: 'b_ifile', maxCount: 1 }
// ]
// ), (req, res) => {
//     const { id, user, formData } = req.body;
//     console.log("Form Data");
//     const query1 = 'INSERT INTO form (id, data, email) values(?, ?, ?)'
//     console.log(id, user.email, formData);
//     db.query(query1, [id, formData, user.email], (err, result) => {
//         if (err) {
//             console.log("The error is: ", err.message);
//             return res.status(400).json(err)
//         }
//         const payload = {
//             id: id,
//         }
//         return res.status(200).json({ id })
//     })
// })

routes.post('/', upload.none(), async (req, res) => {
    try {
        const { id, user, formData } = req.body;
        console.log("ID: ", id);
        console.log("User: ", user);
        console.log("FormData: ", formData);
        console.log(req.body);
        const form = await Form.create({
            id,
            data: formData,
            email: user.email
        });
        return res.status(200).json({ id: form.id });
    } catch (err) {
        console.error('Error:', err);
        return res.status(400).json({ error: err.message });
    }
});




// routes.put('/', (req, res) => {
//     const { id, data2 } = req.body;
//     const query1 = 'Update form set client_data = ?, update_status = ? where id = ?'
//     db.query(query1, [data2, 's', id], (err) => {
//         if (err) {
//             console.log(err)
//             return res.status(400).json({ err })
//         }
//         return res.status(200).json({ msg: true })
//     })
// })

routes.put('/', async (req, res) => {
    try {
        const { id, data2 } = req.body;
        await Form.update({ client_data: data2, update_status: 's' }, {
            where: { id }
        });
        return res.status(200).json({ msg: true });
    } catch (err) {
        console.error('Error:', err);
        return res.status(400).json({ error: err.message });
    }
});



// routes.get('/:email', (req, res) => {
//     const { email } = req.params;
//     const query1 = "Select * from form where email = ?"
//     db.query(query1, [email], (err, result) => {
//         if (err) {
//             return res.status(400).json({ err })
//         }
//         const data = result
//         return res.status(200).json(data)
//     })
// })

routes.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const forms = await Form.findAll({ where: { email } });
        return res.status(200).json(forms);
    } catch (err) {
        console.error('Error:', err);
        return res.status(400).json({ error: err.message });
    }
});


module.exports = routes