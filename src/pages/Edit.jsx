import React,{useState} from 'react'
import Header from '../components/Header'
import Editor from 'mui-rte'
import { Paper, Button, TextField } from '@material-ui/core';
import {makeNewPost} from '../api/API'
import { useAuth } from '../providers/authProvider';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { convertToRaw } from 'draft-js'
const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                marginTop: 20,
                border: '1px solid grey'

            },
            editor: {
                borderBottom: "1px solid gray" ,
                minHeight:"200px",
                maxHeight:"auto"
            }
        }
    }
})
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
      const newContent = JSON.stringify(convertToRaw(event.getCurrentContent()));
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
                <MuiThemeProvider theme={defaultTheme}>
                    <Editor onChange={handleChangeContent} label = "start typing..." inlineToolbar={true} style={{editor:{backgroundColor: "#ebebeb"}}}/>
                </MuiThemeProvider>
            </Paper>
            <Button onClick={handleSubmit} variant="contained" color="primary" style={ {marginTop : "10px", marginLeft : "10%"}}>
                submit
            </Button>

        </>
    );
}