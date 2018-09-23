import React, { Component } from "react";
import DrinkForm from "./DrinkForm.jsx";
import DrinkList from "./DrinkList.jsx";

export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      oz: "",
      percent: "",
      imbibedOn: "",
      error: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getDrinks();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // TODO: Move to utils
  handleStatus(response) {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response;
  }

  getDrinks() {
    const options = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }

    fetch("http://localhost:8000/drinks", options)
      .then(res => this.handleStatus(res))
      .then(res => res.json())
      .then(data => this.handleDrinksData(data))
      .catch(error => this.handleErrors(error));
  }

  handleDrinksData(data) {
    this.setState({
      loading: false,
      drinks: data.drinks,
      perDay: data.stddrinks_per_day,
      total: data.total_stddrinks
    })
  }

  handleErrors(error) {
    if (error.message === "401") {
      this.props.invalidateToken()
    } else {
      this.setState({ loading: false, error: error.message })
    }
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return <div>I'm sorry! Please try again.</div>;
  }

  handleSubmit(event) {
    event.preventDefault();
    const target = event.target;

    const data = new FormData(target),
      oz = data.get("oz"),
      percent = data.get("percent"),
      imbibedOn = data.get("imbibedOn");

    if ([oz, percent, imbibedOn].includes("")) {
      this.setState({ error: "Please fill out all fields" })
      return
    }

    const params = {
      oz: oz,
      percent: percent,
      imbibedOn: (new Date(imbibedOn)).toISOString()
    };

    fetch("http://localhost:8000/drinks", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(params)
    }).then(res => this.handleStatus(res))
      .then(response => response.json())
      .then(data => this.handleFormSubmit(target))
      .catch(error => this.handleErrors(error));
  }

  handleFormSubmit(target) {
    this.setState({
      oz: "",
      percent: "",
      imbibedOn: ""
    })
    this.getDrinks()
  }

  renderDrinks() {
    return (
      <div>
        { this.state.error }
        <DrinkForm
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          oz={this.state.oz}
          percent={this.state.percent}
          imbibedOn={this.state.imbibedOn}
          error={this.state.error}
        />
        <DrinkList
          drinks={this.state.drinks}
          perDay={this.state.perDay}
          total={this.state.total}
        />
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
