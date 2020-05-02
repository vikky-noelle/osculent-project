import React, { Component } from "react";

class Header extends Component {
	render() {
		const divStyle = {
			color: "white",
			width: "100%",
			height: "80px",
			backgroundColor: "black",
		};

		return (
			<div style={divStyle}>
				<h1 style={{ padding: "13px", textAlign: "center" }}>
					Osculent sample Project
				</h1>
			</div>
		);
	}
}

export default Header;
