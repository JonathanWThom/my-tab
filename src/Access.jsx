import React, { Component } from "react";
import Drinks from "./Drinks.jsx"
import Login from "./Login.jsx"

export default class Access extends Component {
  constructor(props) {
    super(props);
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
      cors: "no-cors",
      body: JSON.stringify(params)
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => this.setState({ error }));
  }

  render(){
    return(
      <div>
        <Login handleSubmit={this.handleSubmit} />
        <Drinks />
      </div>
    );
  }
}
