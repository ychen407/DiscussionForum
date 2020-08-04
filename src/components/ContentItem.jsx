import React from 'react';
import { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom"
const styles = (theme)=>({
    heading:{
        alignItems: 'flex-start',
        padding:10,
    }
})
class ContentItem extends Component{

constructor(props) {
    super(props);
    console.log(props);
}
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
                              A
                            </Avatar>
                          }
                title={this.state.title}
                subheader={this.state.timeStamp}

             />

             <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {this.state.content}
                </Typography>
             </CardContent>    
        
         </Card>
         </Link>
     );
 }
}

export default withStyles(styles,{withTheme:true})(ContentItem);