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
	}

	// calling apis on load
	componentDidMount() {
		this.getBlogs();
	}

	render() {
		if (read_cookie("loggedIn")) {
			// this.getBlogs();
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
							height: "300px",
						}}
					>
						{this.state.blogs.length === 0 &&
							"There are currently no Blogs attached to your account!"}
						{blogs.map((blog) => (
							<div key={blog.ID} className="tiles">
								<h3>on {blog.date}</h3>
								<h1>{blog.title}</h1>
								<h2>By {blog.username}</h2>
								<h4>{blog.content}</h4>
								<button
									onClick={() => this.props.history.push("/view/" + blog.ID)}
								>
									View Blog
								</button>
								<button onClick={() => this.handleDelete(blog.ID)}>
									Delete blog
								</button>
							</div>
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

	handleDelete(id) {
		console.log(id);
		fetch("http://localhost:4000/deleteBlog", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					console.log(result);
					if (result.status) this.getBlogs();
				},
				(error) => {
					this.setState({
						error,
					});
				}
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
