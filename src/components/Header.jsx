import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom"
import { useAuth } from '../providers/authProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function ButtonAppBar() {
  const {state,dispatch} = useAuth();
  const classes = useStyles();
  function LoginButton(){
    return (<Button color="inherit" href="/#/login">Login</Button>)
  }
  function LogoutButton(){
    return(
      <Button color="inherit" onClick={()=> dispatch({type :"LOGOUT"})} > Logout</Button>
    )
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar >
          <Link to="/" style={{color : "White"}}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon />
          </IconButton>
          </Link>
           <Typography variant="h6" className={classes.title}>
          </Typography> 
          {state.isAuthenticated ? LogoutButton() : LoginButton()}
        </Toolbar>
      </AppBar>
    </div>
  );
}