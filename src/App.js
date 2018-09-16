import React, { Component } from "react";
import "../node_modules/milligram/dist/milligram.min.css";

import "./App.css";
import {hot} from "react-hot-loader";
import Access from "./Access.jsx"

class App extends Component {
  render(){
    return(
      <div className="container">
        <Access />
      </div>
    );
  }
}

export default hot(module)(App);
