import React, { Component } from "react";
import moment from "moment";

export default class DrinkList extends Component {
  drinkCopy(drink) {
    return drink.stddrink === 1 ? "drink" : "drinks";
  }

  formattedImbibedOn(drink) {
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
    const totalCopy = `${this.props.total} total standard drinks`;
    const perDayCopy = `${this.props.perDay} standard drinks per day`;

    return(
      <div>
        <p>
          { totalCopy }
        </p>
        <p>
          { perDayCopy }
        </p>
        <div>{ drinks }</div>
      </div>
    );
  }
}
