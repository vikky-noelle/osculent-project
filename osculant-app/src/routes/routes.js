import React from "react";
import { Switch, Route } from "react-router-dom";
import wrongRoute from "../pages/wrongRouteView/wrongRoute";
import Home from "../pages/homeView/home";
import blogView from "../pages/blogView/blogView";
import signIn from "../pages/signIn/signIn";
import Register from "../pages/register/register";
import addBlog from "../pages/addBlog/addBlog";

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/signIn" exact component={signIn} />
			<Route path="/register" exact component={Register} />
			<Route path="/view/:id" component={blogView} />
			<Route path="/addBlog" component={addBlog} />

			{/* default route when random url is accessed */}
			<Route component={wrongRoute} />
		</Switch>
	);
}
