const User = require("../src/user");
const assert = require("assert");

describe("Reading users out of the database", () => {
	let joe;

	beforeEach(done => {
		joe = new User({ name: "Joe" });
		joe.save().then(() => done());
	});

	it("should find all users with a name of Joe", done => {
		User.find({ name: "Joe" }).then(users => {
			assert(users[0]._id.toString() === joe._id.toString());
			done()
		});
	});

	it("should find a user with a particular id", (done) => {
		User.findOne({_id: joe._id}).then(user => {
			assert(user.name === "Joe");
			done();
		});
	});
});
