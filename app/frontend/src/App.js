import React from 'react'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Recipe from './components/Recipe'
import UserDetail from './components/UserDetail';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"

const App = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route path='/recipes'>
          <Homepage/>
        </Route>
        <Route path='/recipe/:id'>
          <Recipe/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/signup'>
          <SignUp/>
        </Route>
        <Route path='/account'>
          <UserDetail/>
        </Route>
        <Route path='/'>
          <Redirect to="/recipes" />
        </Route>
      </Switch>
    </div>
  )
}

export default App