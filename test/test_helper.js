const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

mongoose.connection
	.once("open", () => {
		console.log("Good to go.");
	})
	.on("error", error => {
		console.warn("Error", error);
	});
