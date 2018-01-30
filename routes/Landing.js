const express = require('express');
const router = express.Router();
const Car = require('../models/Car')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
		destination: 'public/uploads/',
		filename(req, file, cb) {
				cb(null, `${Date.now()}-${file.originalname}`);
		},
});

const upload = multer({ storage });

router.get('/', (req, res) => {
	 res.render('landing/index')
})

router.get('/admin', (req, res) => {
		res.render('admin/main')
})

router.get('/transports', (req, res) => {
		Car.find({}, function (err, result) {
				if(err)return res.send({error: err})
				res.send(result)
		})
})

router.get('/admin/add', (req, res) =>{
		res.render('admin/new')
})

router.post('/newTransport', upload.any('photos'), (req, res) => {
		const data = req.body
		data.photos = []
		req.files.forEach(function (pics) {
				data.photos.push(pics.path)
		})
		Car.create(data, function (err, result) {
				if(err){
					return res.send({msg: err})
				}
				res.status(200).send({msg: result})
		})
})

router.post('/testUpload', upload.any('photo'), (req, res) => {
		console.log(req.files)
		console.log(req.file)
})

module.exports = router;