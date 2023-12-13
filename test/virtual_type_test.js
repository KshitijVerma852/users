const assert = require("assert");
const User = require("../src/user");

describe("Virtual types", () => {
	it("should number of posts for postCount", done => {
		const joe = new User({ name: "Joe", posts: [{ title: "PostTile" }] });
		joe.save()
			.then(() => User.findOne({ name: "Joe" }))
			.then(user => {
				assert(user.postCount === 1);
				done();
			});
	});
});
