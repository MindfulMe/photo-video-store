const mongoose = require('mongoose');

// scan Schema
const scanSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Scan = module.exports = mongoose.model('Scan', scanSchema);

// Get scans
module.exports.getScans = (callback, limit) => {
	Scan.find(callback).limit(limit);
}

// Add scan
module.exports.addScan = (scan, callback) => {
	Scan.create(scan, callback);
}

// Update scan
module.exports.updateScan = (id, scan, options, callback) => {
	var query = {_id: id};
	var update = {
		name: scan.name
	}
	Scan.findOneAndUpdate(query, update, options, callback);
}


