import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router } from "react-router-dom";

import { Routes } from "./routes/routes";

function App() {
	return (
		<Router>
			<Routes />
		</Router>
	);
}

export default App;
