const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;

// !Middleware
app.use(cors());
app.use(express.json());
dotenv.config();
console.log(process.env.EShopSpots_databse_srv);
const database = () => {
	try {
		mongoose
			.connect(process.env.EShopSpots_databse_srv, {
				dbName: 'E-ShopSpots',
				family: 4,
			})
			.then(() => {
				console.log('database Connected');
			})
			.catch((err) => {
				console.log(err);
			});
	} catch (error) {
		console.log(error);
	}
};
database();
// !Routes
// const NewArrivalProduct = require('./routes/NewArrivalProduct');

app.use('/new-arrival-product', NewArrivalProduct);

app.get('/', (req, res) => {
	res.send('eshopspots-sever');
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
