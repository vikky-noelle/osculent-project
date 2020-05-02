var express = require("express");
var router = express.Router();
var cors = require("cors");
var db = require("../database/dbhandler");

/* GET home page. */
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

module.exports = router;
