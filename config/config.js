const mongoose = require('mongoose')

mongoose.Promise = global.Promise;


module.exports = {
  port: process.env.PORT || 3000,
	db: mongoose.connect('mongodb://localhost/nscars'),
	 authentication: {
			Secret: process.env.JWT_SECRET || 'topSecretKey'
	 }
}
