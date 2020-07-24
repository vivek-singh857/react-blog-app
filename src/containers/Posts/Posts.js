import React, { Component } from "react";
import classes from "./Posts.module.css";
import Button from "../../components/UI/Button/Button";
import axios from "axios";
import Post from "../../components/Post/Post";
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentTwoToneIcon from '@material-ui/icons/CommentTwoTone';
import SendIcon from '@material-ui/icons/Send';
import Spinner from "../../components/UI/Spinner/Spinner";

class Posts extends Component{
    state = {
        newPost: [],
        text: "",
        id: "",
        index: "",
        commentPosted: false,
        isButtonPushed: false,
        loading: false
    }

    componentDidMount(){
        axios.get('https://blog-app-911f4.firebaseio.com/postMaker.json')
        .then(response => {
            let data =[];
            for(let key in response.data){
                response.data[key].allComments = response.data[key].allComments.filter(ele => {
                    return ele !== ""
                });
                response.data[key].data.isLiked = false;
                response.data[key].data.isCommented = false;
                const obj ={
                    uid: key,
                    [key] : response.data[key]
                }
                data.push(obj)
                
            }
            this.setState({newPost : data});
            this.setState({loading: true})
        })

    }


    likeButtonHandler = (id,index) => {
        this.setState({isButtonPushed: true})
        this.setState(prevState => {
            let counter = 0
            if(!prevState.newPost[index][id].data.isLiked){
                counter = 1
            }else{
                counter = -1
            }
            return {
                ...prevState,
                ...prevState.newPost[index][id].data.isLiked = !prevState.newPost[index][id].data.isLiked,
                ...prevState.newPost[index][id].data.likeCount = prevState.newPost[index][id].data.likeCount + (counter)
            } 
        })
        this.setState({id: id, index: index})
    }

    commentButtonHandler = (id,index) => {
        this.setState({isButtonPushed: true})

        this.setState(prevState => {
            return{
                ...prevState,
                ...prevState.newPost[index][id].data.isCommented = !prevState.newPost[index][id].data.isCommented
            }
        })
    }

    textareaChangeHandler = (event) => {
        this.setState({text: event.target.value})
    }

    textareaSubmitHandler = (id,index) => {
        this.setState({commentPosted: true})
        
        this.state.newPost.forEach(element => {
            if(element[id] && this.state.text !== ""){
                this.setState(prevState => {
                    return{
                        ...prevState,
                        ...prevState.newPost[index][id].allComments = prevState.newPost[index][id].allComments.concat(prevState.text)
                    }
                })

            }
        })
        this.setState({id: id , index: index})
    }

    componentDidUpdate(){
        const id= this.state.id;
        const index = +this.state.index;

        if(this.state.isButtonPushed){
            const updates = {
                isLiked: this.state.newPost[index][id].data.isLiked,
                likeCount: this.state.newPost[index][id].data.likeCount,
                isCommented: this.state.newPost[index][id].data.isCommented
            }
    
            axios.put('https://blog-app-911f4.firebaseio.com/postMaker/' + id + '/data.json', updates)
            .then(response => {
                this.setState({isButtonPushed: false})
            })
        }

        if(this.state.text !== "" && this.state.commentPosted){
            const updates = {
                allComments: this.state.newPost[index][id].allComments,
                data: {
                    isLiked: this.state.newPost[index][id].data.isLiked,
                    likeCount: this.state.newPost[index][id].data.likeCount,
                    commentCount: this.state.newPost[index][id].data.commentCount,
                    isCommented: this.state.newPost[index][id].data.isCommented
                },
                title: this.state.newPost[index][id].title,
                content: this.state.newPost[index][id].content,
                author: this.state.newPost[index][id].author,
                uid: id,
                imgURL: this.state.newPost[index][id].imgURL
            }
            axios.put('https://blog-app-911f4.firebaseio.com/postMaker/'+ id + '/.json', updates)
            .then(response => {
                this.setState({text: "" ,commentPosted: false})
            })
        } 
    }

    render() { 
        
        const fetchPost = this.state.newPost.map((key,index) => {
            return(
                <div key = {key.uid} className = {classes.Posts}>
                    <div className = {classes.ImgWrapper}><img className = {classes.Img} src= {key[key.uid].imgURL} alt="User-Img" /></div>
                    
                    <Post title = {key[key.uid].title} content = {key[key.uid].content} author = {key[key.uid].author} />
                    
                    <span className = {classes.Span} style={{textAlign: "right"}}>  {key[key.uid].allComments.length} comments</span>

                    {key[key.uid].data.isLiked ? <Button clicked = {() => this.likeButtonHandler(key.uid, index)}>
                        <FavoriteIcon fontSize="large" style={{color: "crimson"}} /> <i> {key[key.uid].data.likeCount} </i></Button> 
                        : <Button clicked = {() => this.likeButtonHandler(key.uid, index)}> <FavoriteTwoToneIcon fontSize="large" /> <i>{key[key.uid].data.likeCount}</i> </Button> }
                        <Button clicked = {() => this.commentButtonHandler(key.uid, index)} > <CommentTwoToneIcon fontSize="large" /> Comment </Button > 

                    {key[key.uid].data.isCommented ? (<div> 
                        <textarea className = {classes.Textarea} onChange = {this.textareaChangeHandler} value = {this.state.text} placeholder = "Remember, be nice!" /> 
                        <Button btnType = "submit" clicked = { () => this.textareaSubmitHandler(key.uid, index) } > <SendIcon style={{ fontSize: 40 }} /> </Button> 
                        </div>)   : null  }

                    { key[key.uid].allComments.map((comment,index) => {
                        return <span key = {index} className = {classes.Span}> {comment} </span>
                    }) }
                </div>
            ) 
        });
        

        return(
               <div>
                   {this.state.loading ? fetchPost : <Spinner /> }
               </div>
        )
    }
}

export default Posts;