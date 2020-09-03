import React from 'react';
import './App.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import {HashRouter as Router, Switch, Route} from "react-router-dom"
import Login from './pages/Login';
import Signup from './pages/Signup';
import {AuthProvider} from './providers/authProvider';
import PostDetail from './pages/PostDetail';
function App() {

  return (
    <AuthProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/post/:id" component={PostDetail}/>
        <Route path="/edit" component={Edit}/>
        <Route path="/login" component={Login}/>
        <Route path="/Signup" component={Signup}/>
      </Switch>
    </Router>
    </AuthProvider>

  );
}

export default App;
