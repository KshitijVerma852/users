const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
	let joe, blogPost;
	beforeEach(async () => {
		joe = new User({ name: "Joe" });
		blogPost = new BlogPost({
			title: "JS is great",
			content: "lorem ipsum dolor sit amet"
		});
		joe.blogPosts.push(blogPost);
		await joe.save();
		await blogPost.save();
	});

	it("should clean up users dangling blogposts on delete", async () => {
		await joe.deleteOne();
		assert((await BlogPost.countDocuments({})) === 0);
	});
});
