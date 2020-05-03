import React, { Component } from "react";
import { read_cookie } from "sfcookies";
import "./blog.css";

class addBlog extends Component {
	// state = {};

	constructor(props) {
		var today = new Date();
		var date =
			today.getFullYear() +
			"-" +
			(today.getMonth() + 1) +
			"-" +
			today.getDate();
		super(props);
		this.state = {
			username: read_cookie("username"),
			title: "",
			date: date,
			content: "",
		};
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	render() {
		return (
			<div className="blog-form">
				<h1>Blog</h1>
				<label htmlFor="">
					Title{" "}
					<i style={{ fontSize: "0.8em", color: "#333333" }}>
						By {this.state.username}
					</i>
				</label>
				<input
					type="text"
					onChange={this.handleTitleChange}
					value={this.state.title}
					placeholder="Write a title"
					name=""
				/>
				<label htmlFor="">Content</label>
				<textarea
					name=""
					onChange={this.handleContentChange}
					value={this.state.content}
					cols="30"
					rows="10"
					placeholder="Write your blog"
				></textarea>
				<button onClick={this.handleSubmit}>Add blog</button>
			</div>
		);
	}

	handleSubmit(event) {
		if (this.state.title.length === 0 || this.state.content.length === 0)
			alert("title or content can't be an empty field");
		else {
			console.log("calling api");
			fetch("http://localhost:4000/addBlog", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: this.state.username,
					title: this.state.title,
					date: this.state.date,
					content: this.state.content,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					if (res.status) {
						alert("Blog added, redirecting to home.");
						this.props.history.push("/");
					} else alert(`Error in adding blog, error: ${res.message}`);
				});
		}
		event.preventDefault();
	}

	handleTitleChange(event) {
		this.setState({ title: event.target.value });
	}
	handleContentChange(event) {
		this.setState({ content: event.target.value });
	}
}

export default addBlog;
