const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
	let joe;

	beforeEach(done => {
		joe = new User({ name: "Joe" });
		joe.save().then(() => done());
	});

	const assertName = (operation, done) => {
		operation
			.then(() => User.find({}))
			.then(users => {
				assert(users.length === 1);
				assert(users[0].name === "Alex");
				done();
			});
	};

	it("should set and save an instance type", done => {
		joe.set("name", "Alex");
		assertName(joe.save(), done);
	});

	it("should update a model instance", done => {
		assertName(joe.updateOne({ name: "Alex" }), done);
	});

	it("should update using a model class", done => {
		assertName(User.updateOne({ name: "Joe" }, { name: "Alex" }), done);
	});

	it("should update a record using a model class", done => {
		assertName(
			User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }),
			done
		);
	});

	it("should update a record with an Id using a model class", done => {
		assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
	});
});
