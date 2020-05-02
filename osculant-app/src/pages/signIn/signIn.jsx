import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bake_cookie } from "sfcookies";

class signIn extends Component {
	// state = {
	// 	username,
	// 	password,
	// };

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	render() {
		return (
			<div style={{ width: "60%", marginLeft: "20%", height: "auto" }}>
				<h1 style={{ textAlign: "center", marginTop: "50px" }}>Sign In</h1>
				<input
					type="text"
					onChange={this.handleUserChange}
					placeholder="username"
					value={this.state.username}
					style={{ marginLeft: "37%", marginTop: "30px" }}
				/>
				<input
					type="password"
					onChange={this.handlePassChange}
					placeholder="password"
					value={this.state.password}
					style={{ marginLeft: "37%", marginTop: "30px" }}
				/>
				<button
					onClick={this.handleSubmit}
					style={{ marginLeft: "37%", marginTop: "30px" }}
				>
					Log In
				</button>
			</div>
		);
	}

	handleSubmit(event) {
		if (this.state.username.length === 0 || this.state.password.length === 0)
			alert("username or password can't be an empty field");
		else {
			console.log("calling api");
			fetch("http://localhost:4000/verifyUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					if (res.status) {
						alert("Logged In, redirecting to home.");
						bake_cookie("username", this.state.username);
						bake_cookie("loggedIn", true);
						this.props.history.push("/");
					} else alert(`Error in logging in, error: ${res.message}`);
				});
		}
		event.preventDefault();
	}

	handleUserChange(event) {
		this.setState({ username: event.target.value });
	}
	handlePassChange(event) {
		this.setState({ password: event.target.value });
	}
}

export default withRouter(signIn);
