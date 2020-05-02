import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Counter from "../components/counter";

export default function Routes() {
	return (
		<Switch>
			<Route path="/" component={Counter} />
		</Switch>
	);
}

// export default Routes;
