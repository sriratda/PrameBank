const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Import authRoutes
const authController = require('./controllers/authController'); // Import authController
const AccountModel = require('./models/Account');
const viewRoutes = require('./routes/viewRoutes')
const accountRoutes = require('./routes/accountRoutes')

// Initialize Express app
const app = express();

// Set the view engine (if you're using one like EJS)
app.set('view engine', 'ejs');

// Connection URI
const uri = 'mongodb://127.0.0.1:27017/bankDB';// Change 'mydatabase' to your database name

// Connect to MongoDB
mongoose.connect(uri);

// Get the default connection
const db = mongoose.connection;

// Event handlers for connection
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    // You can start using your MongoDB database here
});

const User = require('./models/User');

// Example query to find all users
// User.find()
//     .then(user => {
//         console.log('All accounts:', user);
//     })
//     .catch(error => {
//         console.error('Error retrieving accounts:', error);
//     });


// Middleware for JSON and URL Encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes for handling authentication
app.use('/', authRoutes);
app.use('/account', accountRoutes);
// app.use('/', authRoutes)
// Define the /deposit route
// app.use('/', viewRoutes);

// Use your routes
// app.use('/account', accountRoutes);
// app.use('/transaction', transactionRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
