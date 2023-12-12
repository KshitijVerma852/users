const User = require("../src/user");
const assert = require("assert");

describe("Creating records", () => {
	it("should saves a user", async () => {
		const joe = new User({ name: "Joe" });
		await joe.save();
		assert(!joe.isNew);
	});
});
