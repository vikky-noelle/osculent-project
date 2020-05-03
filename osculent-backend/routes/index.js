var express = require("express");
var router = express.Router();
var cors = require("cors");
var db = require("../database/dbhandler");

// GET REQUESTS
/* GET testing response. */
router.get("/", cors(), function (req, res) {
	console.log("working");
	db.checkConnection(function (err, response) {
		if (err) {
			console.log(err);
			res.send({
				success: false,
				response: "no data",
			});
		} else {
			if (response.length > 0) {
				console.log("success" + response);
				res.send({
					success: true,
					response: response,
				});
			} else
				res.send({
					status: "no data",
				});
		}
	});
});

// get all blogs
router.get("/getBlogs", cors(), function (req, res) {
	const username = req.query.username;
	db.getBlogs(username, function (err, response) {
		if (err) {
			console.log(err);
			res.send({
				status: false,
				message: "Failed to fetch blogs.",
			});
		} else {
			if (response)
				res.send({
					status: true,
					data: response,
				});
			else
				res.send({
					status: false,
					message: "No data.",
				});
		}
	});
});

// POST REQUESTS
// verify username and password
router.post("/verifyUser", cors(), (req, res) => {
	console.log("working");
	const username = req.body.username;
	const password = req.body.password;
	db.verifyUser(username, password, function (err, response) {
		if (err) {
			console.log(err);
			res.send({
				status: false,
				message: "Failed to verify.",
			});
		} else {
			if (response)
				res.send({
					status: response,
					message: "user found!",
				});
			else
				res.send({
					status: false,
					message: "user does not exist.",
				});
		}
	});
});

// registering
router.post("/registerUser", cors(), (req, res) => {
	console.log("working");
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;
	console.log(`username :${username} password: ${password} email: ${email}`);
	db.registerUser(username, email, password, function (err, response) {
		if (err) {
			console.log(err);
			res.send({
				status: false,
				message: "Failed to register.",
			});
		} else {
			if (response)
				res.send({
					status: response,
					message: "user registered!",
				});
			else
				res.send({
					status: false,
					message: "Failed to register.",
				});
		}
	});
});

//adding blog
router.post("/addBlog", cors(), (req, res) => {
	console.log("working");
	const username = req.body.username;
	const date = req.body.date;
	const title = req.body.title;
	const content = req.body.content;
	console.log(`username :${username} title: ${title}`);
	db.addBlog(username, date, title, content, function (err, response) {
		if (err) {
			console.log(err);
			res.send({
				status: false,
				message: "Failed to add.",
			});
		} else {
			if (response)
				res.send({
					status: response,
					message: "blog added!",
				});
			else
				res.send({
					status: false,
					message: "Failed to add.",
				});
		}
	});
});

// deleting blog
router.post("/deleteBlog", cors(), (req, res) => {
	console.log("working");
	const username = req.body.id;
	console.log(`id :${id}`);
	db.deleteBlog(id, function (err, response) {
		if (err) {
			console.log(err);
			res.send({
				status: false,
				message: "Failed to delete.",
			});
		} else {
			if (response)
				res.send({
					status: true,
					message: "blog deleted!",
				});
			else
				res.send({
					status: false,
					message: "Failed to delete.",
				});
		}
	});
});

module.exports = router;
