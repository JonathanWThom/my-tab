import React, { Component } from "react";
import "./App.css";
import {hot} from "react-hot-loader";
import DrinkList from "./DrinkList.jsx"

class App extends Component{
  render(){
    return(
      <DrinkList />
    );
  }
}

export default hot(module)(App);
