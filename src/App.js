import React from 'react';
import {BrowserRouter} from "react-router-dom";
import classes from "./App.module.css";
import Navbar from "./Navbar/Navbar";




function App() {
  return (
    <BrowserRouter>
      <div className = {classes.App}>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
