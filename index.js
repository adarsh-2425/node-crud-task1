const express = require("express");
const app = express();

//const multer = require('multer');
//const upload = multer(); 

// env file access
require('dotenv').config()

// PORT
const PORT = 3000 || process.env.PORT;

// MongoDB Connection
const connectDB = require("./services/db-connection");
connectDB();

//Middleware for parsing
app.use(express.json());
//app.use(upload.fields([])); // Parse only fields

// SignUp Route
const signUpRoute = require("./routers/auth-route");
app.use('/auth', signUpRoute);

// Login Route
const loginRoute = require("./routers/auth-route");
app.use('/auth', loginRoute);

// Profile Route
const dashboard = require("./routers/profile-route");
app.use('/profile', dashboard);

// Update Profile Route
const updateProfileRoute = require("./routers/profile-route");
app.use('/profile', updateProfileRoute)

// home route
app.get('/', (req, res) => {
    res.send({message: "Hi fromn Node App"})
})

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong');
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})