var express = require("express");
var router = express.Router();
var cors = require("cors");
var db = require("../database/dbhandler");

var multer = require("multer");
// file storage
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "uploads/");
	},
	filename: function (req, file, callback) {
		callback(null, new Date().toISOString() + file.originalname);
	},
});
// file filter
const filter = (req, file, callback) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
		callback(null, true);
	else callback(null, false);
};
var upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: filter,
});

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

// get individual blog
router.get("/getBlog", cors(), function (req, res) {
	const id = req.query.id;
	console.log(id);
	db.getBlog(id, function (err, response) {
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
router.post("/addBlog", upload.single("image"), cors(), (req, res) => {
	console.log("working");
	const username = req.body.username;
	const date = req.body.date;
	const title = req.body.title;
	const content = req.body.content;
	const path = req.protocol + "://" + req.get("host") + "/" + req.file.path;
	db.addBlog(username, date, title, content, path, function (err, response) {
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
	const id = req.body.id;
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
