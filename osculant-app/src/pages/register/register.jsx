import React, { Component } from "react";

class Register extends Component {
	// state = {  }

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			email: "",
		};
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handleemailChange = this.handleemailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	render() {
		return (
			<div style={{ width: "60%", marginLeft: "20%", height: "auto" }}>
				<h1 style={{ textAlign: "center", marginTop: "50px" }}>Register</h1>
				<input
					type="text"
					onChange={this.handleUserChange}
					placeholder="username"
					value={this.state.username}
					style={{ marginLeft: "37%", marginTop: "30px" }}
				/>
				<input
					type="text"
					onChange={this.handleemailChange}
					placeholder="email"
					value={this.state.email}
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
					Register
				</button>
			</div>
		);
	}
	handleSubmit(event) {
		if (
			this.state.username.length === 0 ||
			this.state.password.length === 0 ||
			this.state.email.length === 0
		)
			alert("username or password or email can't be an empty field");
		else {
			console.log("calling api");
			fetch("http://localhost:4000/registerUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: this.state.username,
					email: this.state.email,
					password: this.state.password,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					if (res.status) {
						alert("Registered!, redirecting to log in page and log in again.");
						this.props.history.push("/signIn");
					} else alert(`Error in registering, error: ${res.message}`);
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
	handleemailChange(event) {
		this.setState({ email: event.target.value });
	}
}

export default Register;
