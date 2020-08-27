import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from '../components/Header'
import { useState } from 'react';
import {login} from '../api/API'
import { useAuth } from '../providers/authProvider';
export default function Login(props){
    const {dispatch} = useAuth();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const getUsername = (event)=>{
        setUsername(event.target.value);
    }
    const getPassword =(event)=>{
        setPassword(event.target.value);
    }
    const handleLogin = ()=>{
        login(username,password)
        .then(result => (dispatch({type:'LOGIN',payload:{user:result.data,token:result.message}})));
      }
    if(localStorage.getItem("user") !== null){
      setTimeout(function(){props.history.push("/")},1000);
      let username = JSON.parse(localStorage.getItem("user")).username;
      return(
        <div>
           <h1>
            Welcome {username}
          </h1>
          <h1>
          redirecting to home page
          </h1>
        </div>
      )
    }
    return(
        <Fragment>
            <Header/>
            <form>
            <TextField
            onChange={getUsername}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            onChange={getPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passowrd"
            label="passowrd"
            type="passowrd"
            id="passowrd"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </form>
        </Fragment>
        
    )
}