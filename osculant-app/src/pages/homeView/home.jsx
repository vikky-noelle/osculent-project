import React from "react";

function Home() {
	return (
		<div>
			<button
				style={{
					cursor: "pointer",
					marginLeft: "47%",
					marginTop: "50px",
					padding: "10px",
					marginBottom: "50px",
				}}
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
			></div>
		</div>
	);
}

export default Home;
