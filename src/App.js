import React from 'react';
import './App.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import {HashRouter as Router, Switch, Route} from "react-router-dom"
import Post from './components/Post'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/post/:id" component={Post}/>
        <Route path="/edit" component={Edit}/>
      </Switch>
    </Router>

  );
}

export default App;
