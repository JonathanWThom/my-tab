import React, { Component } from "react";
import UserForm from "./UserForm.jsx"

export default class Login extends Component {
  render() {
    return(
      <div>
        <h3>Login</h3>
        <UserForm handleSubmit={this.props.handleSubmit} />
      </div>
    )
  }
}
