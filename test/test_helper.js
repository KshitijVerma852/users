const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

before(done => {
	const MONGO_URI = process.env.MONGO_URI;
	mongoose.connect(MONGO_URI);

	mongoose.connection
		.once("open", () => done())
		.on("error", error => console.warn("Error", error));
});

beforeEach(done => {
	mongoose.connection.collections.users.drop(() => done());
});

after(done => {
	mongoose.connection.close();
	done();
});
