import React, { Component } from "react";
import { read_cookie } from "sfcookies";
import { withRouter } from "react-router-dom";
import "./home.css";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
		};
		this.getBlogs = this.getBlogs.bind(this);
	}
	render() {
		if (read_cookie("loggedIn")) {
			this.getBlogs();
			const { blogs } = this.state;
			return (
				<div>
					<button
						className="add-blog"
						onClick={() => this.props.history.push("/addBlog")}
					>
						Add Blog
					</button>
					<div
						style={{
							width: "70%",
							marginLeft: "15%",
							border: "1px solid black",
							height: "300px",
						}}
					>
						yo
						{blogs.map((blog) => (
							<li key={blog.ID}>{blog.username}</li>
						))}
					</div>
				</div>
			);
		} else
			return (
				<div>
					<h1 style={{ marginTop: "50px", textAlign: "center" }}>
						You are not logged In, log in to access the services.
					</h1>
				</div>
			);
	}

	getBlogs() {
		console.log("api working");
		fetch(
			"http://localhost:4000/getBlogs?username=" + read_cookie("username"),
			{
				method: "GET",
			}
		)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						blogs: result.data,
					});
					console.log(this.state.blogs);
				},
				(error) => {
					this.setState({
						error,
					});
				}
			);
	}
}

export default withRouter(Home);
