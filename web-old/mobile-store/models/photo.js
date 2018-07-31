const mongoose = require('mongoose');

// Photo Schema
const photoSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	scan:{
		type: String,
		required: false
	},
	description:{
		type: String
	},
	author:{
		type: String,
		required: true
	},
	publisher:{
		type: String
	},
	image_url:{
		type: String
	},
	buy_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Photo = module.exports = mongoose.model('Photo', photoSchema);

// Get photos
module.exports.getPhotos = (callback, limit) => {
	Photo.find(callback).limit(limit);
}

// Get photo
module.exports.getPhotoById = (id, callback) => {
	Photo.findById(id, callback);
}

// Add photo
module.exports.addPhoto = (photo, callback) => {
	Photo.create(photo, callback);
}

// Update photo
module.exports.updatePhoto = (id, photo, options, callback) => {
	var query = {_id: id};
	var update = {
		title: photo.title,
		description: photo.description,
		author: photo.author,
		publisher: photo.publisher,
		image_url: photo.image_url,
		buy_url: photo.buy_url
	}
	Photo.findOneAndUpdate(query, update, options, callback);
}

