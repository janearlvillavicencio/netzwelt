// Dependencies and Modules
const express = require('express');
const userController = require('../controllers/user');
const auth = require('../auth');

const { verify, verifyAdmin } = auth;

const router = express.Router();

// Route for checking if user email already exist.
router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for user registration
router.post("/register", userController.registerUser);

// Route for login
router.post("/login", userController.loginUser);

// Route for user details
router.get("/details", verify, userController.getDetails);


module.exports = router;
