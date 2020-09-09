import React from 'react';
import { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import { convertFromRaw } from 'draft-js';

const styles = (theme)=>({
    heading:{
        alignItems: 'flex-start',
        padding:10,
    }
})
class ContentItem extends Component{

 state={
    author : this.props.author,
    title : this.props.title,
    timeStamp : this.props.timeStamp,
    content : this.props.content,
 };
 
 render(){
     return(
         <Link to={'/post/'+this.props.id} style={{ textDecoration: 'none' }}>
         <Card>
             <CardHeader className={styles.heading}
                        avatar={
                            <Avatar aria-label="recipe">
                             {this.state.author[0]}
                            </Avatar>
                          }
                title={this.state.title}
                subheader={"posted by " + this.state.author + " at " + this.state.timeStamp}

             />

             <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {convertFromRaw(JSON.parse(this.state.content)).getPlainText()}
                </Typography>
             </CardContent>    
        
         </Card>
         </Link>
     );
 }
}

export default withStyles(styles,{withTheme:true})(ContentItem);