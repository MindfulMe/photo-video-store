const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passport = require('passport');
app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Scan =require('./models/scan');
Photo =require('./models/photo');
Video = require('./models/video');
// Connect to Mongoose
mongoose.connect('mongodb://MapI:q565602@ds231549.mlab.com:31549/images');
var db = mongoose.connection;
var port = process.env.PORT || 8080;
app.get('/', (req, res) => {
	res.send('Please use /api/photos or /api/videos');
});

app.get('/api/scans', (req, res) => {
	Scan.getScans((err, scans) => {
		if(err){
			throw err;
		}
		res.json(scans);
	});
});

app.post('/api/scans', (req, res) => {
	var scan = req.body;
	Scan.addScan(scan, (err, Scan) => {
		if(err){
			throw err;
		}
		res.json(scan);
	});
});

app.put('/api/scans/:_id', (req, res) => {
	var id = req.params._id;
	var scan = req.body;
	Scan.updateScan(id, scan, {}, (err, scan) => {
		if(err){
			throw err;
		}
		res.json(scan);
	});
});

app.delete('/api/scans/:_id', (req, res) => {
	var id = req.params._id;
	Scan.removeScan(id, (err, scan) => {
		if(err){
			throw err;
		}
		res.json(scan);
	});
});

app.get('/api/photos', (req, res) => {
	Photo.getPhotos((err, photos) => {
		if(err){
			throw err;
		}
		res.json(photos);
	});
});

app.get('/api/photos/:_id', (req, res) => {
	Photo.getPhotoById(req.params._id, (err, photo) => {
		if(err){
			throw err;
		}
		res.json(photo);
	});
});

app.post('/api/photos', (req, res) => {
	var photo = req.body;
	Photo.addPhoto(photo, (err, photo) => {
		if(err){
			throw err;
		}
		res.json(photo);
	});
});

app.put('/api/photos/:_id', (req, res) => {
	var id = req.params._id;
	var photo = req.body;
	Photo.updatePhoto(id, photo, {}, (err, photo) => {
		if(err){
			throw err;
		}
		res.json(photo);
	});
});

// videos
app.get('/api/videos', (req, res) => {
	Video.getVideos((err, videos) => {
		if(err){
			throw err;
		}
		res.json(videos);
	});
});

app.get('/api/videos/:_id', (req, res) => {
	Video.getVideoById(req.params._id, (err, video) => {
		if(err){
			throw err;
		}
		res.json(video);
	});
});

app.post('/api/videos', (req, res) => {
	var video = req.body;
	Video.addVideo(video, (err, video) => {
		if(err){
			throw err;
		}
		res.json(video);
	});
});

app.put('/api/videos/:_id', (req, res) => {
	var id = req.params._id;
	var video = req.body;
	Video.updateVideo(id, video, {}, (err, video) => {
		if(err){
			throw err;
		}
		res.json(video);
	});
});


app.listen(port, () => {
	console.log('Running on port '+port);
});
