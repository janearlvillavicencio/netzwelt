const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

	username: {
		type: String,
		required: [true, 'Username is required']
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	isAdmin: {
		type: Boolean,
		default: false
	}

});

// Model
module.exports = mongoose.model('User', userSchema);
