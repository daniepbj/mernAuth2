const express = require('express');
const app = express(); // Create the Express application

console.log(__dirname);
const path = require('path');
const authRoutes = require(path.join(__dirname, 'backend', 'routes', 'authRoutes'));
require('dotenv').config();

const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;


// ... other middleware ... 
app.use('/backend/routes/authRoutes', authRoutes); // Prefix routes with '/api/auth'
mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB: ', error));


/*
// *** Test Code (Temporary) ***
mongoose.connection.once('open', () => {
console.log("MongoDB database connection established successfully!");
mongoose.connection.close(); // Close connection after test
});

*/ 