var express = require("express");
var path = require("path");
var cors = require("cors");
var favicon = require("static-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var routes = require("./routes/index");
var users = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(favicon());
app.use(logger("dev"));
// configuring body parser for post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.options("*", cors());
app.use(function (req, res, next) {
	res.header("Access_Control-Allow-Origin", "*");
	res.header(
		"Access_Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use("/", routes);
app.use("/users", users);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err,
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: {},
	});
});

// assigning a port for the development
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
