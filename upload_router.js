var express = require('express');
var router = express.Router();
// var crud = require("./Models");
const multer = require('multer');
const path = require('path');
const middleware = require('./middleware');
const Data = require('./upload_models');
const { body, validationResult } = require('express-validator');

const storage = multer.diskStorage({
    destination: './uploads/img',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

// const fileFilter = function (req, file, cb) {
//     if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/pdf') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

const upload = multer({
    storage: storage,
    // fileFilter: fileFilter

})

router.post('/img', upload.single('image'), middleware, async (req, res) => {
    try {
        res.json({
            success: 1,
            image_url: `http://localhost:3000/images/${req.file.filename}`
        })
        console.log(req.file);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");

    }
});


router.post('/adddata', middleware, async (req, res) => {
    let success = false;
    res.json({
        success: 1,
        image_url: `http://localhost:3000/images/${req.file.filename}`
    })

    try {
        const userdata = new Data({
            age: req.body.age,
            gender: req.body.gender,
            dob: req.body.dob,
            mobile_number: req.body.mobile_number

        });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        success = true;
        const Createuser = await userdata.save();
        res.status(201).send(Createuser);


    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);

    }

})

router.get('/getdata/:id', middleware, async (req, res) => {
    try {
        // Find the note to be delete and delete it

        let data = await Data.findById(req.params.id);
        if (!data) {
            return res.status(404).send('Not found');
        }
        res.send(data)

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


router.delete('/deletedata/:id', middleware, async (req, res) => {
    try {
        // Find the note to be delete and delete it

        let data = await Data.findById(req.params.id);
        if (!data) {
            return res.status(404).send('Not found');
        }
        // Allow deletion only if the user own this Notic
        if (data.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }
        data = await Data.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", data: data });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;
