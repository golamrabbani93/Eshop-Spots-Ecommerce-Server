const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Token = process.env.JWT_Token;

// !import  Schema
const UserSchema = require('../schemas/UserSchema');

// !create User Collection
const userCollection = mongoose.model('User', UserSchema);
router.get('/', async (req, res) => {
	try {
		const UserEmail = req.query.email;
		const query = {email: UserEmail};
		const user = await userCollection.findOne(query);
		if (user._id) {
			const token = jwt.sign({UserEmail}, Token, {expiresIn: '1d'});
			return res.send({accessToken: token});
		}
		res.status(403).send({accessToken: ''});
	} catch (error) {
		res.status(500).json({message: 'there is an error in server'});
	}
});
module.exports = router;
