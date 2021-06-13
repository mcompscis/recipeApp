import './App.css';
import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import HomePage from './components/HomePage';
import RecipeTable from './components/RecipeTable';

const App = () => {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route
						path="/"
						exact
						component={() => <HomePage />}
					/>
					<Route
						path="/recipes"
						exact
						component={() => <RecipeTable />}
					/>
					{/*<Route path="/intro">
						<Intro />
					</Route>
					<Route path="/intro">
						<Intro />
					</Route> */}
				</Switch>
			</div>
		</Router>
	);
};

export default App;
