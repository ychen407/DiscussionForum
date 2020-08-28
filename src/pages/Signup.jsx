import React,{Fragment} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from '../components/Header';
import { useState } from 'react';
import { Paper, makeStyles, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {signup} from '../api/API';

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

export default function Signup(props){
    const classes = useStyle();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");
    
    const getUsername = (event)=>{
        setUsername(event.target.value);
    }

    const getPassword =(event)=>{
        setPassword(event.target.value);
    }

    const getPassword2 =(event)=>{
        setconfirmPassword(event.target.value);
    }

    const handleSignUp = ()=>{
        if(password !== confirmPassword){
            setDialogContent("Passwords do not match")
            setOpen(true);
        }
        signup(username,password).then(result =>{
            setDialogContent(result.message);
            setOpen(true);
            if(result.data !== null){
                setTimeout(()=>{props.history.push("/login")},1000);
            }
        });
    }

    return(
      <Fragment>
        <Header/>
        <Paper className = {classes.root}>
            <Typography variant = "h4" className={classes.title}>
              Sign Up
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
            id="passowrd"
            autoComplete="current-password"
          />
          <TextField
            className ={classes.inputField}
            onChange={getPassword2}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm password"
            label="confirm password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            className ={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignUp}
          >
            Sign Up
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