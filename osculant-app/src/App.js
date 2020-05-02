import React from "react";
import "./App.css";
import history from "./services/history";
import { Router } from "react-router-dom";

import Routes from "./routes/routes";
import Header from "./components/header";

function App() {
	return (
		<Router history={history}>
			<Header />
			<Routes />
		</Router>
	);
}

export default App;
