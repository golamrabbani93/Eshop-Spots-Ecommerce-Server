const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const http = require('http');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;

// !Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

const httpServer = http.createServer(app);
async function connectToDatabase() {
	try {
		//! MongoDB connection URI
		const uri = process.env.EShopSpots_database_srv;
		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: 'E-ShopSpots',
		};
		//! Connect to MongoDB using Mongoose
		await mongoose.connect(uri, options);

		console.log('Connected to MongoDB');
	} catch (error) {
		//! Handle connection error
		console.error('Error connecting to MongoDB:', error.message);
	}
}

//! Call the function to connect to the database
connectToDatabase();
// // !Routes
const handleProducts = require('./routes/handleProduct');
const handleUser = require('./routes/HandleUser');
const handleBooking = require('./routes/HandleBooking');
const handlePayment = require('./routes/HandlePayment');
const handleCategory = require('./routes/HandleCategory');
const handleNotification = require('./routes/HandleNotification');

app.use('/products', handleProducts);
app.use('/user', handleUser);
app.use('/booking', handleBooking);
app.use('/payment', handlePayment);
app.use('/category', handleCategory);
app.use('/notification', handleNotification);

app.get('/', (req, res) => {
	res.send('Eshopspots-Sever is Running');
});

httpServer.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
