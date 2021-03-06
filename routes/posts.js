const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
//import schema
const Post = require("../models/Post");

// Get all the posts
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.json({ message: err });
	}
});
// Get a specific post
router.get("/:postId", async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch (err) {
		res.json({ message: err });
	}
});

// Submits a post
router.post("/", async (req, res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description,
	});

	try {
		const savedPost = await post.save();
		res.json(savedPost);
	} catch (error) {
		res.json(error);
	}
});

// Update a post
router.patch("/:postId", async (req, res) => {
	try {
		const updatedPost = await Post.findOneAndUpdate(
			{ _id: req.params.postId },
			{
				$set: {
                    title: req.body.title,
                    description: req.body.description
				},
			},
			{ new: true },
		);
		res.json(updatedPost);
	} catch (err) {
		res.json(error);
	}
});

// Delete a post
router.delete("/:postId", async (req, res) => {
	try {
		const removedPost = await Post.remove({ _id: req.params.postId });
		res.json(req.params.postId);
	} catch (err) {
		res.json(error);
	}
});

module.exports = router;
