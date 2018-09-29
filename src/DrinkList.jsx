import React, { Component } from "react";
import moment from "moment";
import DrinkSortingForm from "./DrinkSortingForm.jsx";
import "./DrinkList.css";

export default class DrinkList extends Component {
  constructor(props) {
    super(props);
  }

  drinkCopy(drink) {
    return drink.stddrink === 1 ? "drink" : "drinks";
  }

  formattedImbibedOn(drink) {
    return moment.utc(drink.imbibedOn).format("MMMM Do, YYYY");
  }

  roundToTwo(num) {
    return +(`${Math.round(`${num}e+2`)}e-2`);
  }

  render() {
    const drinks = this.props.drinks.map(drink => (
      <tr key={drink.id}>
        <td>{this.formattedImbibedOn(drink)}</td>
        <td>{drink.oz}</td>
        <td>
          {drink.percent * 100}
%
        </td>
        <td>{this.roundToTwo(drink.stddrink)}</td>
        <td className="delete" onClick={() => this.props.handleDeleteDrink(drink.id)}>x</td>
      </tr>
    ));
    const totalCopy = (
      <p>
        <strong>Total Standard Drinks: </strong>
        {this.roundToTwo(this.props.total)}
      </p>
    );
    const perDayCopy = (
      <p>
        <strong>Average Standard Drinks Per Day: </strong>
        {this.roundToTwo(this.props.perDay)}
      </p>
    );
    let sortingForm;
    if (this.props.drinks.length > 0) {
      sortingForm = (
        <DrinkSortingForm
          drinks={this.props.drinks}
          handleInputChange={this.props.handleInputChange}
          firstDate={this.props.firstDate}
          lastDate={this.props.lastDate}
          handleSortingFormSubmit={this.props.handleSortingFormSubmit}
        />
      );
    }

    return (
      <div className="drink-list">
        <h4>Summary</h4>
        { sortingForm }
        { totalCopy }
        { perDayCopy }
        <table>
          <thead>
            <tr>
              <th>Imbibed On</th>
              <th>Ounces</th>
              <th>Percent</th>
              <th>Standard Drinks</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { drinks }
          </tbody>
        </table>
      </div>
    );
  }
}
