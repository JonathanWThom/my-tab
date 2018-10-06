import React, { Component } from "react";
import Authenticator from "./Authenticator";
import Drinks from "./Drinks";
import Header from "./Header";
import Logout from "./Logout";
import utils from "./utils";

export default class Access extends Component {
  static validToken() {
    return localStorage.getItem("token") !== null;
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
    this.setState({ validToken: true, error: null });
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
    }).then(response => utils.handleStatus(response))
      .then(response => response.json())
      .then(json => this.setToken(json.token))
      .catch(error => this.setState({ error: error.message }));
  }

  invalidateToken() {
    localStorage.removeItem("token");
    this.setState({ validToken: false });
  }

  render() {
    const { validToken, error } = this.state;

    if (validToken) {
      return (
        <div>
          <Header invalidateToken={this.invalidateToken} />
          <Drinks invalidateToken={this.invalidateToken} />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <p>Judgement free alcohol consumption tracker</p>
        { error }
        <Authenticator handleSubmit={this.handleSignUp} copy="Sign Up"/>
        <Authenticator handleSubmit={this.handleLogin} copy="Login"/>
      </div>
    );
  }
}
