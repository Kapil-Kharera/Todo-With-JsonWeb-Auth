require('dotenv').config();
const express = require('express');
const connectToDB = require('./config/dbConnection');
// const userAuthRoutes = require('./routes/userAuthRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

const app = express();

//express middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


//connection to database
connectToDB();

//custom middleware
// app.use("/api/v1", userAuthRoutes);
app.use("/api/v1", userRoutes);


module.exports = app;