import React from "react";
import { Switch, Route } from "react-router-dom";
import wrongRoute from "../pages/wrongRouteView/wrongRoute";
import Home from "../pages/homeView/home";
import blogView from "../pages/blogView/blogView";

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/view" component={blogView} />

			{/* default route when random url is accessed */}
			<Route component={wrongRoute} />
		</Switch>
	);
}
