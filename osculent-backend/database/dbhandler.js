var sqlite3 = new require("sqlite3").verbose();
// database use
var db = new sqlite3.Database("db/project", (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Connected to the project SQlite database.");
});

exports.checkConnection = function (callback) {
	console.log("check Connection called");
	list = [];
	db.all("SELECT * FROM users", function (err, rows) {
		if (err) return callback(err);
		rows.forEach(function (row) {
			list.push({
				name: row.username,
			});
		});
		return callback(null, list);
	});
};

// verify user
exports.verifyUser = function (username, password, callback) {
	let status = true;
	db.all("SELECT * FROM users", function (err, rows) {
		if (err) return callback(err);
		rows.forEach(function (row) {
			if (username === row.username && password === row.password) {
				status = false;
				return callback(null, true);
			}
		});
		// callback throws 2 responses one after another
		if (status) return callback(null, false);
	});
};

// registering user
exports.registerUser = function (username, email, password, callback) {
	user = {
		$username: username,
		$email: email,
		$password: password,
	};
	db.run(
		`INSERT INTO "users" (username,email,password) VALUES($username, $email, $password)`,
		user,
		function (err) {
			if (err) {
				return callback(err, false);
			}
			return callback(null, true);
		}
	);
};

// adding Blog
exports.addBlog = function (username, date, title, content, callback) {
	user = {
		$username: username,
		$date: date,
		$title: title,
		$content: content,
	};
	db.run(
		`INSERT INTO "blogs" (username,title,date,content) VALUES($username, $title, $date, $content)`,
		user,
		function (err) {
			if (err) {
				return callback(err, false);
			}
			return callback(null, true);
		}
	);
};

exports.getBlogs = function (username, callback) {
	list = [];
	db.all("SELECT * FROM blogs", function (err, rows) {
		if (err) return callback(err);
		rows.forEach(function (row) {
			if (username === row.username) list.push(row);
		});
		return callback(null, list);
	});

	// experimental method for further use

	// db.run(`SELECT FROM * "blogs" WHERE username = ${username}`, function (
	// 	err,
	// 	res
	// ) {
	// 	if (err) return callback(err);
	// 	res.forEach(function (row) {
	// 		list.push(row);
	// 	});
	// 	return callback(null, list);
	// });
};
exports.deleteBlog = function (id, callback) {
	db.all("SELECT * FROM blogs", function (err, rows) {
		if (err) return callback(err);
		rows.forEach(function (row) {
			if (username === row.username) list.push(row);
		});
		return callback(null, list);
	});
};
// db.close causes issues hence db is supposed to be opened again and again
