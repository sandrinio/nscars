const express = require('express');
const router = express.Router();
const Car = require('../models/Car')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
		destination: 'uploads/',
		filename(req, file, cb) {
				cb(null, `${new Date()}-${file.originalname}`);
		},
});

const upload = multer({ storage });




router.get('/', (req, res) => {
	 res.render('landing/index')
})

router.get('/admin', (req, res) =>{
		res.render('admin/main')
})

router.get('/admin/add', (req, res) =>{
		res.render('admin/new')
})

router.post('/newTransport', upload.any('photos'), (req, res) => {
		console.log(req.files)
		// Car.create(req.body, function (err, result) {
		// 		if(err){
		// 			return res.status(406).send(err)
		// 		}
		// 		res.status(200).send({msg: result})
		// })
})

router.post('/testUpload', upload.any('photo'), (req, res) => {
		console.log(req.files)
		console.log(req.file)
})

module.exports = router;