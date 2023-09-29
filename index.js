const express = require("express");
const app = express();

// env file access
require('dotenv').config()

// PORT
const PORT = 3000 || process.env.PORT;

// MongoDB Connection
const connectDB = require("./services/db-connection");
connectDB();

//Middleware for parsing json data
app.use(express.json());

//auth route
const authRoute = require("./routers/auth-route");
app.use('/api/auth', authRoute);

// Profile Route
const profileRoute = require("./routers/profile-route");
app.use('/api/profile', profileRoute);

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong');
  });

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})