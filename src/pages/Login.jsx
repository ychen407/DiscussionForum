import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from '../components/Header';
import { useState } from 'react';
import {login} from '../api/API';
import { useAuth } from '../providers/authProvider';
import { Paper, makeStyles, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyle = makeStyles((theme)=>({
  root :{
    flexWrap: 'wrap',
    marginTop:'100px',
    maxWidth:"50%",
    marginLeft: '25%',
    marginRight:'25%',
    '@media(max-width: 780px)' : {
        maxWidth: '100%',
        marginLeft:'5%',
        marginRight:"5%",
    }
  },
  
  inputField : {
    background: "#dcdedd",
    marginTop:"20px",
    marginLeft:"5%",
    marginRight:"5%",
    width :"90%"
  },
  title :{
    paddingTop:"20px",
    marginBottom:"20px",
    textAlign:"center"
  },
  button:{
    marginTop:"20px",
    marginBottom:"20px",
    marginLeft:"5%",
    marginRight:"5%",
    width :"90%"
  }

  
}));
export default function Login(props){
    const {dispatch} = useAuth();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    
    const classes = useStyle();

    const getUsername = (event)=>{
        setUsername(event.target.value);
    }

    const getPassword =(event)=>{
        setPassword(event.target.value);
    }

    const handleDialogOpen=(msg)=>{
      setDialogContent(msg);
      setOpen(true);
    }
    const handleLogin = ()=>{
        login(username,password)
        .then(result => {
           result.data !== null ?
           dispatch({type:'LOGIN',payload:{user:result.data,token:result.message}})
           : handleDialogOpen(result.message)
          });
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
        <Paper className = {classes.root}>
            <Typography variant = "h4" className={classes.title}>
              Login
            </Typography>
            <Divider/>
            <form>
            <TextField
            className ={classes.inputField}
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
            className ={classes.inputField}
            onChange={getPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            className ={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </form>
        </Paper>
        <Dialog 
            open ={open}
            onClose={()=>{setOpen(false);setDialogContent("")}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogContent}    
                </DialogContentText>
            </DialogContent>
        </Dialog>
      </Fragment>  
    )
}