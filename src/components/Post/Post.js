import React, { Component } from "react";
import classes from "./Post.module.css";

class Post extends Component {
    render(){
    return(
        <div>
            <h2 className = {classes.H2}>{this.props.title}</h2>
            <span className = {classes.Span}>Posted by - {this.props.author} </span>
            <p className = {classes.Para}>{this.props.content} </p>
        </div>
    )}
}

export default Post;