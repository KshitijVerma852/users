const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
	let joe;

	beforeEach(done => {
		joe = new User({ name: "Joe" });
		joe.save().then(() => done());
	});

	it("should remove using model instance", done => {
		joe.deleteOne()
			.then(() => User.findOne({ name: "Joe" }))
			.then(user => {
				assert(user === null);
				done();
			});
	});

	it("should remove using class method", done => {
		User.deleteMany({ name: "Joe" })
			.then(() => User.findOne({ name: "Joe" }))
			.then(user => {
				assert(user === null);
				done();
			});
	});

	it("should remove using class method findOneAndDelete", () => {
		User.findOneAndDelete({ name: "Joe" })
			.then(() => User.findOne({ name: "Joe" }))
			.then(user => {
				assert(user === null);
				done();
			});
	});

	it("should remove using findByIdAndDelete", () => {
		User.findByIdAndDelete(joe._id.toString())
			.then(() => User.findOne({ name: "Joe" }))
			.then(user => {
				assert(user === null);
				done();
			});
	});
});
