const mongoose = require("mongoose");


let UserSchema = new mongoose.Schema({
		mark: {
				type: String,
				required: true
		},
		model: {
				type: String,
				required: true
		},
		year: {
				type: String,
				required: true
		},
		selectedType: {
				type: String,
				required: true
		},
		odometer: {
				type: String,
				required: true
		},
		engine: {
				type: String,
				required: true
		},
		features: [],
		comment: {
				type: String,
				required: true
		},
		photos: [],
		date: {
				type: Date,
				default: Date.now
		},
		price: {
				type: String,
				required: true
		}
});

module.exports = mongoose.model("Car", UserSchema);