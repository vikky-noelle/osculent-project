var express = require("express");
var router = express.Router();
var cors = require("cors");
var db = require("../database/dbhandler");

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

module.exports = router;
