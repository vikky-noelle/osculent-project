import React from "react";
import { read_cookie } from "sfcookies";
import "./home.css";

function Home() {
	if (read_cookie("loggedIn"))
		return (
			<div>
				<button className="add-blog">Add Blog</button>
				<div
					style={{
						width: "70%",
						marginLeft: "15%",
						border: "1px solid black",
						height: "300px",
					}}
				></div>
			</div>
		);
	else
		return (
			<div>
				<h1 style={{ marginTop: "50px", textAlign: "center" }}>
					You are not logged In, log in to access the services.
				</h1>
			</div>
		);
}

export default Home;
