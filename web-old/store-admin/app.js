const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webpush = require("web-push");
const aws = require('aws-sdk');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Scan =require('./models/scan');
Photo =require('./models/photo');
Video = require('./models/video');
// Connect to Mongoose
mongoose.connect('mongodb://MapI:q565602@ds231549.mlab.com:31549/images');
var db = mongoose.connection;
const publicVapidKey = "BCebE3eX_iKz9VDv-jyj3XPnmAPgxHlyqOdZzr2pOr8GPXedy8LfsJ9N17zSJSnzj2E1vKyxXkqN2OxGM0qVqEw";
const privateVapidKey = "0ZIm_NbYl1PrGDyOWl-P4EhRSkFe1EWJB_wJbgyAnFM";

webpush.setVapidDetails(
  "mailto:go.go.gg.rostislav@gmail.com",
  publicVapidKey,
  privateVapidKey
);

var port = process.env.PORT || 8080;

aws.config.region = 'eu-west-2';
const S3_BUCKET = process.env.S3_BUCKET;


// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.get('/sign-s3', (req, res) => {
	const s3 = new aws.S3();
	const fileName = req.query['file-name'];
	const fileType = req.query['file-type'];
	const s3Params = {
	  Bucket: S3_BUCKET,
	  Key: fileName,
	  Expires: 60,
	  ContentType: fileType,
	  ACL: 'public-read'
	};
  
	s3.getSignedUrl('putObject', s3Params, (err, data) => {
	  if(err){
		console.log(err);
		return res.end();
	  }
	  const returnData = {
		signedRequest: data,
		url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
	  };
	  res.write(JSON.stringify(returnData));
	  res.end();
	});
  });
  
  /*
   * Respond to POST requests to /submit_form.
   * This function needs to be completed to handle the information in
   * a way that suits your application.
   */
  app.post('/save-details', (req, res) => {
	// TODO: Read POSTed form data and do something useful
  });
app.get('/', (req, res) => {
	res.send('Please use /api/photos or /api/videos');
});

// start

app.post('/save-details', (req, res) => {
	// TODO: Read POSTed form data and do something useful
  });

app.get('/account', (req, res) => res.render('account.html'));

app.get('/sign-s3', (req, res) => {
	const s3 = new aws.S3();
	const fileName = req.query['file-name'];
	const fileType = req.query['file-type'];
	const s3Params = {
	  Bucket: S3_BUCKET,
	  Key: fileName,
	  Expires: 60,
	  ContentType: fileType,
	  ACL: 'public-read'
	};
  
	s3.getSignedUrl('putObject', s3Params, (err, data) => {
	  if(err){
		console.log(err);
		return res.end();
	  }
	  const returnData = {
		signedRequest: data,
		url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
	  };
	  res.write(JSON.stringify(returnData));
	  res.end();
	});
  });

  // end 

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

app.delete('/api/photos/:_id', (req, res) => {
	var id = req.params._id;
	Photo.removePhoto(id, (err, photo) => {
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

app.delete('/api/videos/:_id', (req, res) => {
	var id = req.params._id;
	Video.removeVideo(id, (err, video) => {
		if(err){
			throw err;
		}
		res.json(video);
	});
});



app.listen(port, () => {
	console.log('Running on port '+port);
});
