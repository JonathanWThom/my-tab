import React, { Component } from "react";
import UserForm from "./UserForm.jsx"

export default class SignUp extends Component {
  render() {
    return(
      <div>
        <h3>Sign Up</h3>
        <UserForm handleSubmit={this.props.handleSubmit} />
      </div>
    )
  }
}
