import React, { Component } from "react";
import UserForm from "./UserForm.jsx"

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    const showForm = this.state.showForm;
    let form;
    if (showForm) {
      form = <UserForm handleSubmit={this.props.handleSubmit} />
    }
    const { copy } = this.props;

    return(
      <div>
        <button
          onClick={this.toggleForm}
          className="button-clear logout-button">{ copy }
        </button>
        { form }
      </div>
    )
  }
}
