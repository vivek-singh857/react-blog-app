import React from "react";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const pageNotFound = () => {
    const customStyle = {
        textAlign: "center",
        fontSize: "5rem",
        color: "crimson",
        fontFamily: "inherit"
    }
    return(
        <div style={{textAlign: "center", margin: "10%"}}>
            <h1 style = {customStyle} >Page Not Found</h1>
            <span> <SentimentVeryDissatisfiedIcon style={{fontSize: "7rem"}} /> </span>
        </div>
    )
}

export default pageNotFound;