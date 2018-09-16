import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <label name="username">Username</label>
        <input
          value={this.state.username}
          onChange={this.handleInputChange}
          name="username"
          type="text"
          />
        <br />
        <label name="password">Password</label>
        <input
          type="password"
          value={this.state.password}
          onChange={this.handleInputChange}
          name="password"
          />
        <br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
