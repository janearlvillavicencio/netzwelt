// Dependencies and Modules
const User = require("../models/User");
const bcrypt = require('bcrypt');
const auth = require("../auth");

module.exports.checkEmailExists = (reqBody) => {
	return User.find({username: reqBody.username}).then(result => {
		if(result.length > 0) {
			return true; //"Duplicate email found"
		} else {
			return false;
		}
	})
};


// Register a User function
module.exports.registerUser = (req, res) => {


	let newUser = new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 8)
	})

	return newUser.save().then((user, error) => {

		if(error) {
			return res.send(false);

		} else {
			return res.send(true);
		}

	}).catch(err => res.send(err))
};


// Login User Function by email
module.exports.loginUser = (req, res) => {
	return User.findOne({username: req.body.username}).then(result => {
		
		if(result == null){
			return false
		} else {
			
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

			if(isPasswordCorrect){
				
				return res.send({access: auth.createAccessToken(result)});
			} else {
				
				return res.send(false);
			}
		}
	}).catch(err => res.send(err));
};



// User User Details Retrieve Function

module.exports.getDetails = (req, res) => {

	return User.findById(req.user.id).then(result => {
			
			result.password = "";
			return res.send(result);
				
	}).catch(err => res.send(err));
};
