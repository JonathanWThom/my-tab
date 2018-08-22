import React, { Component } from "react";

export default class DrinkList extends Component {
  drinkCopy(drink) {
    return drink.stddrink === 1 ? "drink" : "drinks";
  }
  
  render() {
    const drinks = this.props.drinks.map((drink) =>
      <div key={drink.id}>
        <p>{drink.oz} oz at {drink.percent * 100}% is {drink.stddrink} standard { this.drinkCopy(drink) }</p>
      </div>
    )

    return(
      <div>{ drinks }</div>
    );
  }
}
