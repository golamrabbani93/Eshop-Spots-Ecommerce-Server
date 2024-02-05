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
		if (userEmail) {
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
		} else {
			const users = await userCollection.find();
			if (users.length > 0) {
				return res.status(200).json({
					message: 'success',
					data: users,
				});
			} else {
				return res.status(404).json({
					message: 'Not Found',
					data: 0,
				});
			}
		}
	} catch (error) {
		return res.status(500).json({message: 'there is an error in server'});
	}
});
// !Update user Details Data in database
router.put('/:id', async (req, res) => {
	try {
		const userId = req.params.id;
		const userData = req.body;
		const updateData = {
			$set: {
				phone: userData.phone,
				street: userData.street,
				townCity: userData.townCity,
				country: userData.country,
			},
		};
		// !update user data
		const updatedUser = await userCollection.updateOne({_id: userId}, updateData);
		if (updatedUser.acknowledged === true && updatedUser.modifiedCount > 0) {
			return res.status(200).json({
				message: 'Update success',
				user: updatedUser,
			});
		} else {
			return res.status(404).json({
				message: 'Update Unsuccess',
			});
		}
	} catch (error) {
		return res.status(500).json({message: 'there is an error in server'});
	}
});
// !Create new user in database
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
//! update user role to admin
router.patch('/makeadmin/:id', async (req, res) => {
	try {
		const userId = req.params.id;
		const updateData = {
			$set: {
				userRole: 'admin',
			},
		};
		// !update user data
		const updatedUser = await userCollection.updateOne({_id: userId}, updateData);
		if (updatedUser.acknowledged === true && updatedUser.modifiedCount > 0) {
			return res.status(200).json({
				message: 'Update success',
				user: updatedUser,
			});
		} else {
			return res.status(404).json({
				message: 'Update Unsuccess',
			});
		}
	} catch (error) {
		return res.status(500).json({message: 'there is an error in server'});
	}
});
// !Delete user from database
router.delete('/delete/:id', async (req, res) => {
	try {
		const userId = req.params.id;
		const deletedUser = await userCollection.deleteOne({_id: userId});
		if (deletedUser.acknowledged === true && deletedUser.deletedCount > 0) {
			return res.status(200).json({
				message: 'Delete success',
				user: deletedUser,
			});
		} else {
			return res.status(404).json({
				message: 'Delete Unsuccess',
			});
		}
	} catch (error) {
		return res.status(500).json({message: 'there is an error in server'});
	}
});
module.exports = router;
