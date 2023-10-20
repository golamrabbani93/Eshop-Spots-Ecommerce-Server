const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import  Schema
const UserSchema = require('../schemas/UserSchema');

// !create User Collection
const userCollection = mongoose.model('User', UserSchema);

router.get('/', async (req, res) => {});
router.post('/', async (req, res) => {
	try {
		const userdata = req.body;
		console.log('🚀🚀: userdata', userdata);
		const newUser = new userCollection(userdata);
		console.log('🚀🚀: newUser', newUser);
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
