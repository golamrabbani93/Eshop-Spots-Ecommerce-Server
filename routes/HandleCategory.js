const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import  Schema
const CategorySchema = require('../schemas/CategorySchema');

// !create NewArrivalProducts Collection
const categoryCollection = new mongoose.model('Category', CategorySchema);

router.get('/', async (req, res) => {
	res.send('hello from categories');
});

module.exports = router;
