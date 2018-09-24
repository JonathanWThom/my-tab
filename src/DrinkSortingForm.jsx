import React, { Component } from "react";
import moment from "moment";

export default class DrinkSortingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    //this.handleSignUp = this.handleSignUp.bind(this);
  }

  formatForInput(value) {
    return moment(value).format("YYYY-MM-DD")
  }

  handleInputChange() {
    console.log("changed")
  }


  render(){
    const drinks = this.props.drinks;
    const firstDate = this.formatForInput(drinks[0].imbibedOn);
    const lastDate = this.formatForInput(drinks[drinks.length - 1].imbibedOn);

    return(
      <div>
        <form>
          <div className="row">
            <div className="column">
              <input type="date" value={firstDate} onChange={this.handleInputChange} />
            </div>
            <div className="column">
              <input type="date" value={lastDate} onChange={this.handleInputChange} />
            </div>
            <div className="column">
              <button>Update</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
