
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

/*
class App extends Component {
    render() {
        return <h1>React app</h1>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
*/
//import './App.css';
//import React from "react";
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

//export default App;
ReactDOM.render(<App />, document.getElementById('app'));