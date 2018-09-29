import React, { Component } from "react";
import Drinks from "./Drinks";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";

export default class Access extends Component {
  static validToken() {
    return localStorage.getItem("token") !== null;
  }

  static handleStatus(response) {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response;
  }

  constructor(props) {
    super(props);
    this.state = {
      validToken: Access.validToken(),
      error: null,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.invalidateToken = this.invalidateToken.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  setToken(token) {
    localStorage.setItem("token", token);
    this.setState({ validToken: true });
  }

  handleLogin(event) {
    this.submitUserForm(event, `${process.env.API_URL}/login`);
  }

  handleSignUp(event) {
    this.submitUserForm(event, `${process.env.API_URL}/signup`);
  }

  submitUserForm(event, path) {
    event.preventDefault();
    const data = new FormData(event.target);

    const params = {
      username: data.get("username"),
      password: data.get("password"),
    };

    fetch(path, {
      method: "POST",
      body: JSON.stringify(params),
    }).then(response => Access.handleStatus(response))
      .then(response => response.json())
      .then(json => this.setToken(json.token))
      .catch(error => this.setState({ error: error.message }));
  }

  invalidateToken() {
    localStorage.removeItem("token");
    this.setState({ validToken: false });
  }

  // TODO: Refactor header into component
  // TODO: Refactor SignUp/Login, they are basically the same

  render() {
    const { validToken, error } = this.state;

    if (validToken) {
      return (
        <div>
          <div className="header text-align-right">
            <h3 className="float-left">My Tab</h3>
            <Logout invalidateToken={this.invalidateToken} />
          </div>
          <Drinks invalidateToken={this.invalidateToken} />
        </div>
      );
    }
    return (
      <div>
        <div className="header text-align-left">
          <h3>My Tab</h3>
        </div>
        <p>Judgement free alcohol consumption tracker</p>
        { error }
        <SignUp handleSubmit={this.handleSignUp} />
        <Login handleSubmit={this.handleLogin} />
      </div>
    );
  }
}
