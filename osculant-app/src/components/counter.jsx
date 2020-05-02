import React, { Component } from "react";

class Counter extends Component {
	state = {
		data: "Hello World!",
		count: 0,
	};

	constructor() {
		super();
		this.handleEvent = this.handleEvent.bind(this);
		console.log("constructor working");
	}

	handleEvent() {
		console.log(this.state.data);
	}

	// changing states
	handleEventWithoutConstructor = () => {
		console.log("handling event without constructor", this.state.count);
		this.setState({ count: this.state.count + 1 });
	};

	render() {
		return (
			// used to provide no divs but divs can be used too
			// <React.Fragment>
			//     <h1>{this.justFunction()}</h1>
			//     <button>Increament</button>
			// </React.Fragment>
			<div className="container">
				<h1>
					{this.justFunction()}
					{this.state.count}
				</h1>
				<button
					onClick={(this.handleEvent, this.handleEventWithoutConstructor)}
				>
					Increament
				</button>
			</div>
		);
	}

	justFunction() {
		const { data } = this.state;
		return <b>{data}</b>;
	}
}

export default Counter;
