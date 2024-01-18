const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import  Schema
const UserSchema = require('../schemas/UserSchema');

// !create User Collection
const userCollection = mongoose.model('User', UserSchema);

router.get('/', async (req, res) => {
	try {
		//* get email from client side
		const userEmail = req.query.email;
		//* get user from database
		const userDetails = await userCollection.findOne({email: userEmail});

		if (userDetails._id) {
			return res.status(200).json({
				message: 'success',
				user: userDetails,
			});
		} else {
			return res.status(404).json({
				message: 'No Data Found',
				userDetails: {},
			});
		}
	} catch (error) {
		return res.status(500).json({message: 'there is an error in server'});
	}
});
router.post('/', async (req, res) => {
	try {
		const userdata = req.body;
		// !allready user exist in database
		const allReadyExist = await userCollection.findOne({email: userdata.email});
		if (allReadyExist) {
			return res.status(200).json({
				message: 'success',
			});
		}
		// !create new user
		const newUser = new userCollection(userdata);
		const savedUser = await newUser.save();
		if (savedUser._id) {
			res.status(200).json({
				message: 'success',
			});
		} else {
			res.status(500).json({
				message: 'there is an error in server',
			});
		}
	} catch (error) {
		res.status(500).json({message: 'there is an error in server'});
	}
});

module.exports = router;
