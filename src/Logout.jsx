import React, { Component } from "react";

export default class Logout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <a className="button button-clear logout-button" onClick={this.props.invalidateToken}>Logout</a>
    )
  }
}
