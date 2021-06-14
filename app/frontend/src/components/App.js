
import React, { Component, Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import recipeService from '../actions/recipes'

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
    
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        recipeService.getRecipes().then(recipes =>
          setRecipes( recipes )
        )  
      }, [])
    console.log(recipes)
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
						component={() => <RecipeTable recipesL={recipes}/>}
					/>
					{/*<Route path="/intro">
						<Intro />
					</Route>
					<Route path="/intro">
						<Intro />
                    </Route>*/ }
                    
				</Switch>
			</div>
		</Router>
	);
};

//export default App;
ReactDOM.render(<App />, document.getElementById('app'));