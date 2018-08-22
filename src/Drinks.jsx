import React, { Component } from "react";
import DrinkForm from "./DrinkForm.jsx";
import DrinkList from "./DrinkList.jsx";

export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getDrinks();
  }

  getDrinks() {
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

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target),
      params = { oz: data.get("oz"), percent: data.get("percent") };

    fetch("http://localhost:8000/drinks", {
      method: "post",
      body: JSON.stringify(params)
    }).then(response => response.json())
      .then(data => this.setState({ drinks: [...this.state.drinks, data] }))
      .catch(error => this.setState({ error }));
  }

  renderDrinks() {
    return (
      <div>
        <DrinkForm handleSubmit={this.handleSubmit} />
        <DrinkList drinks={this.state.drinks}/>
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
