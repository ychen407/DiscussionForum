import React from "react";
import {Grid,Paper,makeStyles,Avatar, Box, Divider, Typography} from '@material-ui/core';
import { useState, useEffect  } from 'react';
import {getPostDetail, submitReply} from '../api/API';
import Header from '../components/Header';
import Pagination from '@material-ui/lab/Pagination';
import Editor from 'mui-rte'
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { useAuth } from '../providers/authProvider';
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

const useStyle = makeStyles((theme)=>({
    container : {
        width : "900px",
        margin : "auto",
        marginTop : "40px",
        '@media(max-width : 900px)':{
            width:"auto",
            margin : "0"
        }
    },
    replyBox :{
        width : "auto",
        marginTop :"20px"
    },
    child :{
        marginLeft : "10px",
        marginTop : "10px",
        marginBottom : "10px",
        display: "inline-flex",
        span :{
            margin : "auto",
        }
    },
    detail : {
        marginTop : "20px",
        marginLeft: "10%",
        marginRight: "50px",
        '@media(max-width: 600px)' : {
            marginTop : "0",
            marginLeft:'0',
        }
    },
    authorInfo:{
        maxWidth:"200px",
        position : "relative",
        marginTop:"auto",
        marginLeft:"auto"
    },
    authorAvatar : {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight:"10px",

    },
    pagination:{
        '& > *': {
            marginTop: theme.spacing(2),
          },
    }

}));
export default function PostDetail(props){
    const [replies,setRepies] = useState(null);
    const [width,setWidth] = useState(window.innerWidth);
    const [numPage,setNumPage] = useState(0) ;
    const [currentPage,setCurrentPage] = useState(1);
    const [mReply,setMReply] = useState(null) ;
    const classes = useStyle();
    const [content,setContent] = useState(null) ;
    const {state} = useAuth();

    window.addEventListener('resize',handleResize);
    
    function handleResize(){
        setWidth(window.innerWidth);
    }
    const handleChangeMReply = event =>{
        const mReply = event.getCurrentContent().getPlainText()
        setMReply(mReply);
    };
    const handleReply =()=>{
        if(mReply.length ===0){
            alert("Reply can not be empty");
            return;
        }
        if(state.isAuthenticated && mReply.length > 0){
            submitReply({ content : mReply, replyTo : props.match.params.id})
            .then(response => response.json())
            .then(({data,status,message}) => status === 200 ? true : false)
            setTimeout(function (){window.location.reload();}, 1000);
        }else{
            alert("You have not signed it yet. Redirecting to login page");
            setTimeout(function (){ props.history.push("/login")}, 500);
        }
    };
    useEffect(()=>{
       getPostDetail(props.match.params.id).then((result) => setContent(result));
        return ()=>{window.removeEventListener('resize',handleResize)};
    });
    useEffect(()=>{
        fetch(`http://springboot-democh.herokuapp.com/replies/post=${props.match.params.id}/page=${currentPage-1}`)
        .then(res => res === null ? null : res.json())
        .then(data => {data === null ? setRepies(null) : setNumPage(data.data[1]);setRepies(data.data[0]);})
        }, [currentPage,props.match.params.id]);
    
    const handlePageChange = (e,page)=>{
        setCurrentPage(page);
    }
    return(
        <div className={classes.root}>
            <Header/>
            <div className={classes.container}>
                {content === null ? <span></span>:
                <Paper className={classes.inner}>
                    <Divider/>
                    <Typography variant="h5" className={classes.child}>{content.data.title}</Typography>
                    <Divider/>
                    <article className={classes.child}>
                        <div className={classes.authorAvatar}> <Avatar >{content.data.username[0]}</Avatar></div>
                        <div>
                            <div><span>{content.data.username}</span></div>
                            <div><span>{content.data.created}</span></div>
                            <div><p>{content.data.content}</p></div>
                        </div>
                    </article>
                    <Divider/>
                </Paper>
                }
                <Paper className={classes.replyBox}>
                    {replies &&
                    (replies.length === 0 ?  null:
                        replies.map((r)=>
                        (<div key ={r.id}>
                            <article className={classes.child}>
                                <div className={classes.authorAvatar}> <Avatar >{r.username[0]}</Avatar></div>
                                <div>
                                    <div><span>{r.username}</span></div>
                                    <div><span>{r.created}</span></div>
                                    <div><p>{r.content}</p></div>
                                </div>
                            </article>
                            <Divider/>
                        </div>))
                    )
                    }
                    { replies && (replies.length === 0? null:
                    <Pagination className={classes.pagination} count={numPage} shape="rounded"  onChange = {handlePageChange}/>)
                    }
                    <Divider/>
                    <MuiThemeProvider theme={defaultTheme}>
                        <Editor onChange={handleChangeMReply} label = "start typing..." inlineToolbar={true} style={{editor:{backgroundColor: "#ebebeb"}}}/>
                    </MuiThemeProvider>
                </Paper>
                <Button  onClick={handleReply} variant="contained" color="primary">
                        Reply
                </Button>
            </div>
        </div>


    );
} 