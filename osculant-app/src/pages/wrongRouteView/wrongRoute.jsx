import React, { Component } from "react";

class wrongRoute extends Component {
	state = {};
	render() {
		return (
			<h1 style={{ textAlign: "center", marginTop: "100px" }}>
				This url doesn't exist in the website
				<br />
				Error Code: 404.
			</h1>
		);
	}
}

export default wrongRoute;
