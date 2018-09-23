import React, { Component } from "react";
import moment from "moment";

export default class DrinkList extends Component {
  dateRange() {
    const drinks = this.props.drinks;
    if (drinks.length > 1) {
      return `${this.formattedImbibedOn(drinks[0])} - ${this.formattedImbibedOn(drinks[drinks.length - 1])}`
    } else if (drinks.length === 1) {
      return this.formattedImbibedOn(drinks[0]);
    }
  }

  drinkCopy(drink) {
    return drink.stddrink === 1 ? "drink" : "drinks";
  }

  formattedImbibedOn(drink) {
    return moment(drink.imbibedOn).format("MMMM Do, YYYY");
  }

  roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
  }

  render() {
    const drinks = this.props.drinks.map((drink) =>
      <div key={drink.id}>
        <p>
          {this.formattedImbibedOn(drink)}: &nbsp;
          {drink.oz} oz at {drink.percent * 100}% is &nbsp;
          {this.roundToTwo(drink.stddrink)} standard &nbsp;
          { this.drinkCopy(drink) }
        </p>
      </div>
    )
    const dateRangeCopy = <p><strong>Date Range: </strong>{this.dateRange()}</p>
    const totalCopy = <p><strong>Total Standard Drinks: </strong>{this.roundToTwo(this.props.total)}</p>;
    const perDayCopy =
      <p>
        <strong>Average Standard Drinks Per Day: </strong>
        {this.roundToTwo(this.props.perDay)}
      </p>;


    return(
      <div>
          { dateRangeCopy }
          { totalCopy }
          { perDayCopy }
        <div>{ drinks }</div>
      </div>
    );
  }
}
