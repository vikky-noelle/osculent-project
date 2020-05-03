import React, { Component } from "react";
import "./blogview.css";

class blogView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			content: "",
			username: "",
			date: "",
			url: "",
		};
	}

	componentDidMount() {
		this.getBlog();
	}

	render() {
		return (
			<div className="blog-view">
				<button onClick={() => this.props.history.push("/")}>Go Back</button>
				<h1>{this.state.title}</h1>
				<h2>By {this.state.username}</h2>
				<h2>Date {this.state.date}</h2>
				<img src={this.state.url} alt="" />
				<p>{this.state.content}</p>
			</div>
		);
	}

	getBlog() {
		const id = this.props.match.params.id;
		fetch("http://localhost:4000/getBlog?id=" + id, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						title: result.data[0].title,
						content: result.data[0].content,
						username: result.data[0].username,
						date: result.data[0].date,
						url: result.data[0].imageurl,
					});
					console.log(this.state);
				},
				(error) => {
					this.setState({
						error,
					});
				}
			);
	}
}

export default blogView;
