const assert = require("assert");
const User = require("../src/user");

describe("Validating users", () => {
	it("should require a user name", () => {
		const user = new User({ name: undefined });
		const { message } = user.validateSync().errors.name;
		assert(message === "Name is required.");
	});

	it("should require a user name longer than 2 characters", () => {
		const user = new User({ name: "Al" });
		const { message } = user.validateSync().errors.name;
		assert(message === "Name must be longer than 2 characters.");
	});

	it("should disallow invalid records from being saved", done => {
		const user = new User({ name: "Al" });
		user.save().catch(validationResult => {
			const { message } = validationResult.errors.name;
			assert(message === "Name must be longer than 2 characters.");
			done();
		});
	});
});
