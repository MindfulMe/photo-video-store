const mongoose = require('mongoose');

// Video Schema
const videoSchema = mongoose.Schema({
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
	video_url:{
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

const Video = module.exports = mongoose.model('Video', videoSchema);

// Get videos
module.exports.getVideos = (callback, limit) => {
	Video.find(callback).limit(limit);
}

// Get video
module.exports.getVideoById = (id, callback) => {
	Video.findById(id, callback);
}

// Add video
module.exports.addVideo = (video, callback) => {
	Video.create(video, callback);
}

// Update video
module.exports.updateVideo = (id, video, options, callback) => {
	var query = {_id: id};
	var update = {
		title: video.title,
		description: video.description,
		author: video.author,
		publisher: video.publisher,
		video_url: video.video_url,
		buy_url: video.buy_url
	}
	Video.findOneAndUpdate(query, update, options, callback);
}

