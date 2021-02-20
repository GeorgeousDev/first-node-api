const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
//import routes
const homeRoute = require("./routes/home");
const postRoute = require("./routes/posts");

const app = express();

app.use(bodyParser.json());

//Routes
app.use("/posts", postRoute);
app.use("/", homeRoute);

app.listen(3000);

//Connecting to database

mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = app;
