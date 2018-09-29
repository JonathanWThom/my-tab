import React, { Component } from "react";

export default class DrinkForm extends Component {
  render() {
    return(
      <div>
        <h4>Add Drink</h4>
        <form id="drink-form" onSubmit={this.props.handleSubmit}>
          <label name="oz">Ounces</label>
          <input
            value={this.props.oz}
            onChange={this.props.handleInputChange}
            name="oz"
            type="number"
            step="0.01"
            />
          <br />
          <label name="percent">Percent</label>
          <input
            value={this.props.percent}
            onChange={this.props.handleInputChange}
            name="percent"
            type="number"
            step="0.01"
            />
          <br />
          <label name="imbibedOn">Imbibed On</label>
          <input
            value={this.props.imbibedOn}
            onChange={this.props.handleInputChange}
            type="date"
            name="imbibedOn"
            />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
