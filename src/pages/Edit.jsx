import React,{useState} from 'react'
import Header from '../components/Header'
import Editor from 'mui-rte'
import { Paper, Button, TextField } from '@material-ui/core';
import {makeNewPost} from '../api/API'
import { useAuth } from '../providers/authProvider';
export default function Edit(props){

    const [title,setTitle] = useState(null);
    const [content,setContent] = useState(null);
    const {state} = useAuth();
    const handleSubmit = ()=>{
    if(state.isAuthenticated){
        makeNewPost({title: title, content : content,author : state.user.username})
        .then(response => response.json())
        .then(({data,status,message}) => status === 200 ? true : false);
        setTimeout(function (){ props.history.push("/")}, 1000);
    }else{
        alert("You have not signed it yet. Redirecting to login page");
        setTimeout(function (){ props.history.push("/login")}, 500);
    }
        
    };
    const handleChangeContent = event =>{
      const newContent = event.getCurrentContent().getPlainText()
      setContent(newContent);
    };

    const handleChangeTitle =(event)=>{
        setTitle(event.target.value);
    };
    
    return(
        <>
            <Header/>
            
            <Paper style={{minHeight : "200px", width : '90%', marginLeft : "5%"}} variant ='outlined'>
                <TextField onChange={handleChangeTitle} label='Title:' fullWidth variant="filled" id="margin-none"/> 
                <Editor onChange={handleChangeContent} label = "start typing..." inlineToolbar={true} style={{editor:{backgroundColor: "#ebebeb"}}}/>
            </Paper>
            <Button onClick={handleSubmit} variant="contained" color="primary" style={ {marginTop : "10px", marginLeft : "10%"}}>
                submit
            </Button>

        </>
    );
}