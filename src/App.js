import React, { Component } from "react";
import "./App.css";
import {hot} from "react-hot-loader";
import Drinks from "./Drinks.jsx"

class App extends Component{
  render(){
    return(
      <div>
        <Drinks />
      </div>
    );
  }
}

export default hot(module)(App);
