import React, { Component } from "react";
import Drinks from "./Drinks.jsx"
import Login from "./Login.jsx"

export default class Access extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validToken: this.validToken(),
      error: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target),
      username = data.get("username"),
      password = data.get("password");

      var params = {
        username: username,
        password: password
      };

    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify(params)
    }).then(response => response.json())
      .then(data => this.setToken(data.token))
      .catch(error => this.setState({ error }));
  }

  validToken() {
    return localStorage.getItem("token") !== null;
  }

  setToken(token) {
    localStorage.setItem("token", token)
    this.setState({validToken: true})
  }

  render(){
    if (this.state.validToken) {
      return(
        <Drinks />
      );
    } else {
      return(
        <Login handleSubmit={this.handleSubmit} />
      );
    }

  }
}
