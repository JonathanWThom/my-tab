import React, { Component } from "react";
import moment from "moment";
import utils from "./utils";
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
      error: null,
      firstDate: "",
      lastDate: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSortingFormSubmit = this.handleSortingFormSubmit.bind(this);
    this.handleDeleteDrink = this.handleDeleteDrink.bind(this);
  }

  componentDidMount() {
    this.getDrinks();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSortingFormSubmit(event) {
    event.preventDefault();

    const target = event.target;
    const data = new FormData(target);
    const params = {
      start: data.get("firstDate"),
      end: data.get("lastDate"),
    };

    this.getDrinks(params, true);
  }

  getDrinks(parameters, sorting) {
    const sort = sorting || false;
    const params = parameters || {};
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const url = new URL(`${process.env.API_URL}/drinks`);
    url.search = new URLSearchParams(params);

    fetch(url, options)
      .then(res => utils.handleStatus(res))
      .then(res => res.json())
      .then(data => this.handleDrinksData(data, sort))
      .catch(error => this.handleErrors(error));
  }

  handleDrinksData(data, sort) {
    let firstDate;
    let lastDate;
    if (sort === true) {
      firstDate = this.state.firstDate;
      lastDate = this.state.lastDate;
    } else {
      firstDate = this.getFirstDate(data.drinks);
      lastDate = this.getLastDate(data.drinks);
    }

    this.setState({
      loading: false,
      drinks: data.drinks,
      perDay: data.stddrinks_per_day,
      total: data.total_stddrinks,
      firstDate,
      lastDate,
    });
  }

  getFirstDate(drinks) {
    if (drinks.length) {
      return utils.formatForInput(drinks[0].imbibedOn);
    }
    return "";
  }

  getLastDate(drinks) {
    if (drinks.length) {
      return utils.formatForInput(drinks[drinks.length - 1].imbibedOn);
    }
    return "";
  }

  handleErrors(error) {
    if (error.message === "401") {
      this.props.invalidateToken();
    } else {
      this.setState({ loading: false, error: error.message });
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

    const data = new FormData(target);


    const oz = data.get("oz");


    const percent = data.get("percent");


    const imbibedOn = data.get("imbibedOn");

    if ([oz, percent, imbibedOn].includes("")) {
      this.setState({ error: "Please fill out all fields" });
      return;
    }

    const params = {
      oz,
      percent,
      imbibedOn: (new Date(imbibedOn)).toISOString(),
    };

    fetch(`${process.env.API_URL}/drinks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(params),
    }).then(res => utils.handleStatus(res))
      .then(response => response.json())
      .then(data => this.handleFormSubmit(target))
      .catch(error => this.handleErrors(error));
  }

  handleDeleteDrink(id) {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (confirm("Are you sure?")) {
      fetch(`${process.env.API_URL}/drinks/${id}`, options)
        .then(res => utils.handleStatus(res))
        .then(this.handleDeleteDrinkData())
        .catch(error => this.handleErrors(error));
    }
  }

  handleDeleteDrinkData() {
    const { firstDate, lastDate } = this.state;
    const params = {
      start: firstDate,
      end: lastDate,
    };
    this.getDrinks(params);
  }

  handleFormSubmit(target) {
    this.setState({
      oz: "",
      percent: "",
      imbibedOn: "",
    });
    this.getDrinks();
  }

  renderDrinks() {
    return (
      <div className="row">
        { this.state.error }
        <div className="column">
          <DrinkList
            drinks={this.state.drinks}
            perDay={this.state.perDay}
            total={this.state.total}
            handleInputChange={this.handleInputChange}
            firstDate={this.state.firstDate}
            lastDate={this.state.lastDate}
            handleSortingFormSubmit={this.handleSortingFormSubmit}
            handleDeleteDrink={this.handleDeleteDrink}
          />
        </div>
        <div className="column">
          <DrinkForm
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            oz={this.state.oz}
            percent={this.state.percent}
            imbibedOn={this.state.imbibedOn}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } if (this.state.drinks) {
      return this.renderDrinks();
    }
    return this.renderError();
  }
}
