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

  drinkPercent(drink) {
    return (drink.percent * 100).toFixed(1);
  }

  render() {
    const {
      dateRange,
      drinks,
      total,
      perDay,
      handleDeleteDrink,
      handleInputChange,
      handleSortingFormSubmit,
    } = this.props;

    const drinksTable = drinks.map(drink => (
      <tr key={drink.id}>
        <td>{drink.name}</td>
        <td>{this.formattedImbibedOn(drink)}</td>
        <td>{drink.oz}</td>
        <td>
          {this.drinkPercent(drink)}%
        </td>
        <td>{this.roundToTwo(drink.stddrink)}</td>
        <td className="delete" onClick={() => handleDeleteDrink(drink.id)}>x</td>
      </tr>
    ));
    const totalCopy = (
      <p>
        <strong>Total Standard Drinks: </strong>
        {this.roundToTwo(total)}
      </p>
    );
    const perDayCopy = (
      <p>
        <strong>Average Standard Drinks Per Day: </strong>
        {this.roundToTwo(perDay)}
      </p>
    );
    let sortingForm;
    if (drinks.length > 0) {
      sortingForm = (
        <DrinkSortingForm
          drinks={drinks}
          handleInputChange={handleInputChange}
          dateRange={dateRange}
          handleSortingFormSubmit={handleSortingFormSubmit}
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
              <th>Name</th>
              <th>Imbibed On</th>
              <th>Ounces</th>
              <th>Percent</th>
              <th>Standard Drinks</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { drinksTable }
          </tbody>
        </table>
      </div>
    );
  }
}
