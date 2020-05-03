import React, { Component } from "react";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import { withRouter } from "react-router-dom";
import "./header.css";

class Header extends Component {
	componentDidMount() {
		bake_cookie("loggedIn", false);
	}

	render() {
		return (
			<div className="header">
				<h1>Osculent sample Project</h1>
				<ul>
					<li onClick={() => this.props.history.push("/")}>Home</li>
					{this.menuFunction()}
				</ul>
			</div>
		);
	}
	menuFunction() {
		console.log(`working ${read_cookie("loggedIn")}`);
		if (read_cookie("loggedIn") === true)
			return <li onClick={() => this.logOut()}>Log Out</li>;
		else
			return (
				<React.Fragment>
					<li onClick={() => this.props.history.push("/signIn")}>Log In</li>
					<li onClick={() => this.props.history.push("/register")}>Register</li>
				</React.Fragment>
			);
	}
	logOut() {
		alert("logging out");
		bake_cookie("loggedIn", false);
		delete_cookie("username");
		this.props.history.push("/signIn");
	}
}

export default withRouter(Header);
