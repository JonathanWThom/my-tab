import React, { Component } from "react";
import moment from "moment";

export default class DrinkList extends Component {
  drinkCopy(drink) {
    return drink.stddrink === 1 ? "drink" : "drinks";
  }

  formattedImbibedOn(drink) {
    console.log(drink.imbibedOn)
    return moment(drink.imbibedOn).format("MMMM Do, YYYY");
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

    return(
      <div>{ drinks }</div>
    );
  }
}
