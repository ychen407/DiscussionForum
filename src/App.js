import React from 'react';
import './App.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import {HashRouter as Router, Switch, Route} from "react-router-dom"
import Post from './components/Post'
import Login from './pages/Login';
import {AuthProvider} from './providers/authProvider';
function App() {

  return (
    <AuthProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/post/:id" component={Post}/>
        <Route path="/edit" component={Edit}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
    </AuthProvider>

  );
}

export default App;
