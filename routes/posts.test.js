const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv/config");
const Post = require("../models/Post");
var bodyParser = require("body-parser");
var express = require("express");
const app = require("../app");

beforeAll(async () => {
	mongoose.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

it("posting new post", async (done) => {
	const post = require("./posts");
	app.use(bodyParser.json());
	const res = await request(app)
		.post("/posts")
		.send({
			title: "Test post",
			description: "im writing new test for my app",
		})
		.set("Accept", /application\/json/);
	const posts = await Post.findOne({ title: "Test post" });
	
	expect(posts.title).toEqual('Test post');
	
	done();
});

it("update post", async () => {
	const post = new Post({
		title: "string 1",
		description: "string 2",
	});
	const createdPost = await post.save();
	const res = await request(app)
		.patch(`/posts/${createdPost._id}`)
		.send({
			title: "string 3",
			description: "string 4",
		})
		.set("Accept", /application\/json/);
		
	expect(res.body.title).toEqual("string 3");
});

it("delete post", async () => {
	const post = new Post({
		title: "string one",
		description: "string two",
	});
	const createdPost = await post.save();
	const res = await request(app)
		.delete(`/posts/${createdPost._id}`)
		.set("Accept", /application\/json/);
	const posts = await Post.findOne({ _id: createdPost._id });
	
	expect(posts).toBe(null)
});
