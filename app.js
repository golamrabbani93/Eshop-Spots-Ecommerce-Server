const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const http = require('http');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
const {Server} = require('socket.io');

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

app.use('/products', handleProducts);
app.use('/user', handleUser);
app.use('/booking', handleBooking);
app.use('/payment', handlePayment);
app.use('/category', handleCategory);

app.get('/', (req, res) => {
	res.send('Eshopspots-Sever is Running');
});

const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

io.on('connection', (socket) => {
	io.emit('test', 'Test Message');

	// console.log('a user connected');
	socket.on('disconnect', () => {
		// console.log('user disconnected');
	});
});

httpServer.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
