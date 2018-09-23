import React, { Component } from "react";
import moment from "moment";

export default class DrinkList extends Component {
  drinkCopy(drink) {
    return drink.stddrink === 1 ? "drink" : "drinks";
  }

  formattedImbibedOn(drink) {
    return moment(drink.imbibedOn).format("MMMM Do, YYYY");
  }

  dateRange() {
    const drinks = this.props.drinks;
    if (drinks.length > 1) {
      return `${drinks[0].imbibedOn} - ${drinks[drinks.length - 1].imbibedOn}`
    } else if (drinks.length === 1) {
      return drinks[0].imbibedOn
    }
  }

  render() {
    const drinks = this.props.drinks.map((drink) =>
      <div key={drink.id}>
        <p>
          {this.formattedImbibedOn(drink)}: &nbsp;
          {drink.oz} oz at {drink.percent * 100}% is &nbsp;
          {drink.stddrink} standard &nbsp;
          { this.drinkCopy(drink) }
        </p>
      </div>
    )
    const dateRangeCopy = <p><strong>Date Range: </strong>{this.dateRange()}</p>
    const totalCopy = <p><strong>Total Standard Drinks: </strong>{this.props.total}</p>;
    const perDayCopy =
      <p>
        <strong>Average Standard Drinks Per Day: </strong>
        {this.props.perDay}
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
