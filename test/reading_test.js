const User = require("../src/user");
const assert = require("assert");

describe("Reading users out of the database", () => {
	let joe, maria, alex, zach;

	beforeEach(done => {
		alex = new User({ name: "Alex" });
		maria = new User({ name: "Maria" });
		zach = new User({ name: "Zach" });
		joe = new User({ name: "Joe" });

		Promise.all([joe.save(), alex.save(), maria.save(), zach.save()]).then(
			() => done()
		);
	});

	it("should find all users with a name of Joe", done => {
		User.find({ name: "Joe" }).then(users => {
			assert(users[0]._id.toString() === joe._id.toString());
			done();
		});
	});

	it("should find a user with a particular id", done => {
		User.findOne({ _id: joe._id }).then(user => {
			assert(user.name === "Joe");
			done();
		});
	});

	it("should be able to skip and limit the result set", done => {
		User.find({})
			.sort({ name: 1 })
			.skip(1)
			.limit(2)
			.then(users => {
				assert(users.length === 2);
				assert(users[0].name === "Joe");
				assert(users[1].name === "Maria");
				done();
			});
	});
});
