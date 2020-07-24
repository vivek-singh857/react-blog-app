import React, { Component } from "react";
import {Link,Switch,Route} from "react-router-dom";
import "./Navbar.css";
import PostBuilder from "../containers/PostBuilder/PostBuilder";
import PageNotFound from "../hoc/pageNotFound";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import Contact from "../components/Contact/Contact";
import asyncComponent from "../hoc/asynComponent";

const AsyncPosts = asyncComponent( () => {
    return import('../containers/Posts/Posts')
})

class Navbar extends Component {
    render(){
    return(
        <div>
            <header className="header">
            <div className = "container">
                <nav>
                <h1 className="brand"><span>Blogbook</span></h1>
                <ul>
                    <li><Link to="/"> <HomeOutlinedIcon fontSize="large" /> Home</Link></li>
                    <li><Link to="/create-post"> <PostAddOutlinedIcon fontSize = "large"/> compose</Link></li>
                    <li><Link to="/contact"> <ContactMailOutlinedIcon fontSize = "large" /> Contact</Link></li>
                </ul>

                </nav>
            </div>
            </header>
            <Switch>
                <Route path ="/" exact component = {AsyncPosts} />
                <Route path="/create-post" exact component = {PostBuilder} />
                <Route path="/contact" exact component = {Contact} />
                <Route component = {PageNotFound} />
            </Switch>

        </div>
    )
     
}
}

export default Navbar;




                    



