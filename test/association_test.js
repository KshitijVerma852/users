const mongoose = require("mongoose");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");
const assert = require("assert");

describe("Associations", async () => {
	let joe, blogPost, comment;
	beforeEach(async () => {
		joe = new User({ name: "Joe" });
		blogPost = new BlogPost({
			title: "JS is great",
			content: "lorem ipsum dolor sit amet"
		});
		comment = new Comment({ content: "JS is actually shit" });
		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;
		await joe.save();
		await blogPost.save();
		await comment.save();
	});

	it("should save a relation between a user and a blogpost", async () => {
		const user = await User.findOne({ name: "Joe" }).populate("blogPosts");
		assert(user.blogPosts[0].title === "JS is great");
	});

	it("should save a full relation graph", async () => {
		const user = await User.findOne({ name: "Joe" }).populate({
			path: "blogPosts",
			populate: {
				path: "comments",
				model: "comment",
				populate: {
					path: "user",
					model: "user"
				}
			}
		});
		assert(user.name === "Joe");
		assert(user.blogPosts[0].title === "JS is great");
		assert(user.blogPosts[0].comments[0].content === "JS is actually shit");
		assert(user.blogPosts[0].comments[0].user.name === "Joe");
	});
});
