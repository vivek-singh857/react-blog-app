import React from "react";
import classes from "./Contact.module.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const contact =() => {
    return(
        <div className = {classes.HvrIconPulseGrow}>
            <a href="https://www.facebook.com/vispo.vivek.4/" target="blank"> <FacebookIcon className={classes.HvrIcon} style = {{fontSize: "10rem", color:"#3b5999"}} />  </a>
            <a href="https://twitter.com/vivekku32161347?s=08" target="blank"> <TwitterIcon className={classes.HvrIcon} style = {{fontSize: "10rem", color:"#55acee"}} />  </a>
            <a href="https://www.instagram.com/vispooooo/" target="blank"> <InstagramIcon className={classes.HvrIcon} style = {{fontSize: "10rem", color:" #e4405f"}} />  </a>
            <a href="https://www.linkedin.com/in/vivek-kumar-singh-1602b8a3/" target="blank">  <LinkedInIcon  className={classes.HvrIcon} style = {{fontSize: "10rem", color:"#0077B5"}} />  </a>
            <a href="https://github.com/vivek-singh857" target="blank"> <GitHubIcon className={classes.HvrIcon} style = {{fontSize: "10rem", color:"#34465d"}} />  </a>
        </div>
    )
}

export default contact;