import React, { Component } from "react";
import Drinks from "./Drinks.jsx"
import Login from "./Login.jsx"
import Logout from "./Logout.jsx"
import SignUp from "./SignUp.jsx"

export default class Access extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validToken: this.validToken(),
      error: null
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.invalidateToken = this.invalidateToken.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleLogin(event) {
    this.submitUserForm(event, "http://localhost:8000/login")
  }

  handleSignUp(event) {
    this.submitUserForm(event, "http://localhost:8000/signup")
  }

  // TODO: Move to utils
  handleStatus(response) {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response;
  }


  submitUserForm(event, path) {
    event.preventDefault();
    const data = new FormData(event.target),
      params = {
        username: data.get("username"),
        password: data.get("password")
      };

    fetch(path, {
      method: "POST",
      body: JSON.stringify(params)
    }).then(response => this.handleStatus(response))
      .then(response => response.json())
      .then(data => this.setToken(data.token))
      .catch(error => this.setState({ error: error.message }));
  }

  validToken() {
    return localStorage.getItem("token") !== null;
  }

  setToken(token) {
    localStorage.setItem("token", token)
    this.setState({validToken: true})
  }

  invalidateToken() {
    localStorage.removeItem("token")
    this.setState({validToken: false})
  }

  render(){
    if (this.state.validToken) {
      return(
        <div>
          <Logout invalidateToken={this.invalidateToken}/>
          <Drinks invalidateToken={this.invalidateToken}/>
        </div>
      );
    } else {
      return(
        <div>
          { this.state.error }
          <SignUp handleSubmit={this.handleSignUp} />
          <Login handleSubmit={this.handleLogin} />
        </div>
      );
    }

  }
}
