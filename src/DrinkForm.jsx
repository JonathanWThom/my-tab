import React, { Component } from "react";

export default class DrinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oz: "",
      percent: "",
      imbibedOn: "",
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

  /// TODO RESET PROPS ON SUBMIT

  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <label name="oz">Ounces</label>
        <input value={this.state.oz} onChange={this.handleInputChange} name="oz" />
        <br />
        <label name="percent">Percent</label>
        <input value={this.state.percent} onChange={this.handleInputChange} name="percent" />
        <br />
        <label name="imbibedOn">Imbibed On</label>
        <input value={this.state.imbibedOn} onChange={this.handleInputChange} type="datetime-local" name="imbibedOn" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
