import React, { Component } from "react";
import Button from "../../components/UI/Button/Button"
import classes from "./PostBuilder.module.css";
import axios from "axios";
import {storage} from "../../../firebase";
import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone';
import Spinner from "../../components/UI/Spinner/Spinner";

class PostBuilder extends Component {
    state = {
        title: '' ,
        content: '' ,
        author: '',
        file: null,
        imgURL: "",
        loading: false,
        isUploaded: false,
        isDisabled: true
    }

    inputChangeHandler = (event) => {
        let titleValue = event.target.value;
        this.setState({title: titleValue})
    }

    inputAuthorHandler = (event) => {
        let author = event.target.value;
        this.setState({author: author});
    }

    textareaChangeHandler = (event) => {
        let contentValue = event.target.value;
        this.setState({content: contentValue})
        
    }

    handleImage = (event) => {
        let file = event.target.files;
        this.setState({file: file , isDisabled: true})
    }

    uploadHandler = () => {
        this.setState({isUploaded: true})
        let file = this.state.file[0];
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then( url => {
                    this.setState({imgURL: url , isDisabled: false})
                });
            }
        )
    }

    submitHandler = (event) => {
        this.setState({loading: true})
        event.preventDefault();
        const buildedPost = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author,
            imgURL: this.state.imgURL,
            allComments: [""],
            uid: "",
            data: {
                isLiked: false,
                isCommented: false,
                likeCount: 0
            }
        }

        if(buildedPost.content === ''){
            alert('You have no content. Try adding something.')
            this.setState({loading: false})
        }else if(this.state.isUploaded){
            axios.post("https://blog-app-911f4.firebaseio.com/postMaker/.json",buildedPost)
            .then(response => {
                this.setState({loading: false})
        })
            this.setState({title: '', content: ''})
        }else{
            alert("Please Upload Image")
            this.setState({loading: false})
        }

    }
  

    render(){
       const  customStyleTextarea={
           overflow: "hidden",
           wordWrap: "break-word",
           resize: "none",
           height: " 160px"
       }

       const buildPost = (
        <div className = {classes.PostBuilder}>
        <div className={classes.Input} >
            <input onChange={this.inputChangeHandler} type="text"  name="title" value = {this.state.title}/>
            <label >Title</label>
        </div>

        <div className={classes.Input} >
            <input onChange={this.inputAuthorHandler} type="text"  name="author" value = {this.state.author}/>
            <label >Author</label>
        </div>

        <div className={classes.Input}>
            <input onChange={this.handleImage} type="file" name="img" accept="image/*" />
            <label>Image</label>
            <Button clicked = {(event) => {this.uploadHandler(event)}} ><PublishTwoToneIcon style={{fontSize: "4rem", color: "crimson"}} /></Button>
        </div>

        <div className={classes.Input}>
        <textarea className = {classes.Textarea} onChange = {this.textareaChangeHandler} name = 'content' style = {{customStyleTextarea}} value = {this.state.content} rows = "4"/>
        <label>Content</label>
        </div>

        <button className = {classes.Button} disabled = {this.state.isDisabled} onClick = {this.submitHandler}><i>Post </i></button>
        </div>
       )

        return ( <div>
                { this.state.loading ? <Spinner /> : buildPost}
                </div>)
    }
}

export default PostBuilder;