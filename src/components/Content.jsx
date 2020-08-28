import React,{useState,useEffect} from 'react';
import {Grid,Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import ContentItem from './ContentItem';
import Pagination from '@material-ui/lab/Pagination';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme)=>({
    root:{
        marginTop:'20px',
        padding: '2px 4px',
        display: 'flex',
        maxWidth:"80%",
        marginLeft: '20%',
        marginRight:'20%',
        '@media(max-width: 780px)' : {
            maxWidth: '100%',
            marginLeft:'0',
            marginRight:'0',
        }
    },
    item:{
        height:200,
        margin:'auto'
    },
    newPostButton:{
        float: 'right'
    },
    pagination:{
        '& > *': {
            marginTop: theme.spacing(2),
          },
    }
}));
 
export default function Content(props){
    const classes = useStyles();

    const [numPage,setNumPage] = useState(0) ;
    const [data,setData] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    
    useEffect(()=>{
        fetch("http://localhost:8080/posts/page="+(currentPage-1))
            .then(res => res.json())
            .then(
                (result) => {setNumPage(result.data[1]);setData([result.data[0]])})},[currentPage]);
    
    const handlePageChange = (e,page)=>{
        setCurrentPage(page);
        console.log("current page" + currentPage);
    }

    return(
        <Paper component='div' className={classes.root} variant='outlined' square>
            <Grid container direction='column' spacing = {0} >
                <Grid item>
                    <Button component={Link} to={'/edit/'} className={classes.newPostButton} variant="contained" color="primary" >
                        New Post
                    </Button>                    
                </Grid>
               
                    { data && data[0].map((p)=>(
                        <Grid item key={p.id} >
                            <ContentItem id={p.id} author={p.username} title={p.title} timeStamp={p.created} content={p.content}/>
                        </Grid>    
                        )) }
               
                <Grid item>
                    <Divider/>
                    <Pagination className={classes.pagination} count={numPage} shape="rounded"  onChange = {handlePageChange}/>
                </Grid>
            </Grid>
        </Paper>
    );
}
    

