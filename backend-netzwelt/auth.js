const jwt = require('jsonwebtoken');

// Used to sign and confirm if the token is recognized or can be authenticated by our server app.
const secret = "netzwelt";

// Token Creation
module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		username: user.username,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, secret, {});
};


module.exports.verify = (req, res, next) => {
	console.log(req.headers.authorization);

    let token = req.headers.authorization;

    if(typeof token === "undefined"){
		return res.send({auth: "Failed. No Token received."});
	} else {
		console.log(token);
		token = token.slice(7, token.length);
		console.log(token);
		// The "Bearer" was sliced afterwards
	}

	// Token decryption
	jwt.verify(token, secret, function(err, decodedToken){
		if(err) {
			return res.send({
				auth: "Failed",
				message: err.message
			});
		} else {
			console.log(decodedToken);
			req.user = decodedToken;
			next();
		}
	})
};

// verifyAdmin function
module.exports.verifyAdmin = (req, res, next) => {

	console.log(req.user);
	if(req.user.isAdmin) {
		next();
	} else {
		return res.send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
};