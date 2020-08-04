import React,{useEffect,useMemo,useState} from 'react'
import Header from '../components/Header'
import Editor from 'mui-rte'
import { Paper, Button, Typography, TextField } from '@material-ui/core';
import { convertToRaw } from 'draft-js'
import makeNewPost from '../api/API'
export default function Edit(){

    const [title,setTitle] = useState(null);
    const [content,setContent] = useState(null);

    const handleSubmit = ()=>{console.log(title);console.log(content)
        makeNewPost({title: title, content : content,author : 0});
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