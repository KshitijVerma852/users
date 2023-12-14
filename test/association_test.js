const mongoose = require("mongoose");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Associations", () => {
	let joe, blogPost, comment;

	beforeEach(done => {
		joe = new User({ name: "Joe" });
		blogPost = new BlogPost({
			title: "JS is great",
			content: "Brilliant Language"
		});
		comment = new Comment({ content: "JS is shit" });

		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;
	});
});
