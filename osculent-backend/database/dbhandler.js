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

// db.close causes issues hence db is supposed to be opened again and again
