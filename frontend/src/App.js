import logo from './logo.svg';
import './App.css';
import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
				</header>
				<Route path="/intro">
					<Intro />
				</Route>
				{/* <Route path="/intro">
					<Intro />
				</Route>
				<Route path="/intro">
					<Intro />
				</Route>
				<Route path="/intro">
					<Intro />
				</Route> */}
			</div>
		</Router>
	);
}

function Intro() {
	return <h2>The Intro page</h2>;
}

export default App;
