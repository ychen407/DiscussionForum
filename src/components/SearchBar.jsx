import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles((theme) => ({
    root: {
      marginTop:'20px',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      margin: 'auto',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));
  
  export default function SearchBar() {
    const classes = useStyles();
  
    return (
      <Paper component="form" className={classes.root} elevation={3} variant="outlined"> 
        <InputBase
          className={classes.input}
          color ='secondary'
          placeholder=" not implemented yet"
          inputProps={{ 'aria-label': 'search ' }}
        />
        <IconButton onClick={()=>alert("not implemented error")} className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
      </Paper>
    );
  }