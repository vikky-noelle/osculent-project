import React, { Component } from "react";
import { read_cookie, delete_cookie } from "sfcookies";
import "./header.css";

class Header extends Component {
	render() {
		return (
			<div className="header">
				<h1>Osculent sample Project</h1>
				<ul>
					<li>Home</li>
					{this.menuFunction()}
				</ul>
			</div>
		);
	}
	menuFunction() {
		console.log(`working ${read_cookie("loggedIn")}`);
		if (read_cookie("loggedIn") === true)
			return <li onClick={this.logOut}>Log Out</li>;
		else return <li>Log In</li>;
	}
	logOut() {
		alert("logging out");
	}
}

export default Header;
