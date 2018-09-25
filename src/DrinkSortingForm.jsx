import React, { Component } from "react";

export default class DrinkSortingForm extends Component {
  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSortingFormSubmit}>
          <div className="row">
            <div className="column">
              <input
                type="date"
                value={this.props.firstDate}
                onChange={this.props.handleInputChange}
                name="firstDate"
              />
            </div>
            <div className="column">
              <input
                type="date"
                value={this.props.lastDate}
                onChange={this.props.handleInputChange}
                name="lastDate"
              />
            </div>
            <div className="column">
              <input type="submit" value="Update Range" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
