import React, { Component } from "react";

export default class DrinkList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
   fetch("http://localhost:8000/drinks")
     .then(res => res.json())
     .then(
       drinks => this.setState({ loading: false, drinks }),
       error => this.setState({ loading: false, error })
     );
   }

   renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return <div>I'm sorry! Please try again.</div>;
  }

  renderDrinks() {
    const drinks = this.state.drinks.map((drink) =>
      <div>
        <p>{drink.oz} oz at {drink.percent}% is {drink.stddrink} standard drink</p>
      </div>
    );

    return (
      <div>
        { drinks }
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else if (this.state.drinks) {
      return this.renderDrinks();
    } else {
      return this.renderError();
    }
  }
}
