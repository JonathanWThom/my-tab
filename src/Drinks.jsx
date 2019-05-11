import React, { Component } from "react";
import moment from "moment";
import utils from "./utils";
import DrinkForm from "./DrinkForm";
import DrinkList from "./DrinkList";
import Pagination from "./Pagination";
import Drink from "./Drink";
import update from 'immutability-helper';
import DateRange from "./DateRange";

export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      drink: new Drink(),
      error: null,
      dateRange: new DateRange(),
      page: 1,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrinkInputChange = this.handleDrinkInputChange.bind(this);
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
    this.handleSortingFormSubmit = this.handleSortingFormSubmit.bind(this);
    this.handleDeleteDrink = this.handleDeleteDrink.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.getPages = this.getPages.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.visitPage = this.visitPage.bind(this);
    this.jumpBack = this.jumpBack.bind(this);
    this.jumpForward = this.jumpForward.bind(this);
  }

  componentDidMount() {
    this.getDrinks();
  }

  // could DRY this and handleDateInputChange up
  handleDrinkInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const state = update(this.state, {
      drink: { $merge: { [name]: value } }
    });

    this.setState(state);

    if (name === "name" && this.getOptions().includes(value)) {
      const data = this.state.drinks.find(drink => {
        return drink.name === value;
      });
      const newState = update(this.state, {
        drink: { $merge: { name: data.name, percent: data.percent * 100, oz: data.oz } }
      });
      this.setState(newState);
    }
  }

  handleDateInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const state = update(this.state, {
      dateRange: { $merge: { [name]: value } }
    });

    this.setState(state);
  }

  handleSortingFormSubmit(event) {
    event.preventDefault();
    const { dateRange } = this.state;
    const { start, end } = dateRange;
    const params = {
      start: start,
      end: end,
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
    const { dateRange } = this.state;
    let newDateRange = new DateRange();

    if (sort === true) {
      newDateRange = dateRange;
    } else {
      dateRange.start = this.getFirstDate(data.drinks);
      dateRange.end = this.getLastDate(data.drinks);
    }

    this.setState({
      loading: false,
      drinks: data.drinks,
      perDay: data.stddrinks_per_day,
      total: data.total_stddrinks,
      dateRange: dateRange,
    });
  }

  getLastDate(drinks) {
    if (drinks.length) {
      return utils.formatForInput(drinks[0].imbibedOn);
    }
    return "";
  }

  getFirstDate(drinks) {
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
    const { drink } = this.state;
    const { oz, percent, imbibedOn, name } = drink;

    if ([oz, percent, imbibedOn].includes("")) {
      this.setState({ error: "Please fill out all fields" });
      return;
    }

    const params = {
      oz,
      percent: percent.toString(),
      imbibedOn: (new Date(imbibedOn)).toISOString(),
      name,
    };

    fetch(`${process.env.API_URL}/drinks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(params),
    }).then(res => utils.handleStatus(res))
      .then(response => response.json())
      .then(data => this.handleFormSubmit())
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
    const { dateRange } = this.state;
    const { start, end } = dateRange;
    this.getDrinks({
      start: start,
      end: end,
    });
  }

  handleFormSubmit() {
    const drink = new Drink();
    const state = update(this.state, { $set: { drink: drink } });
    this.setState(state);
    this.getDrinks();
  }

  paginatedDrinks() {
    const { page } = this.state;
    const end = page * 10;
    const start = end - 10;
    return this.state.drinks.slice(start, end);
  }

  nextPage() {
    const { page } = this.state;
    this.setState({
      page: page + 1
    })
  }

  previousPage() {
    const { page } = this.state;
    this.setState({
      page: page - 1
    })
  }

  lastPage() {
    this.setState({
      page: this.getPages()
    })
  }

  firstPage() {
    this.setState({
      page: 1
    })
  }

  getPages() {
    const { drinks } = this.state;
    return Math.ceil(drinks.length / 10);
  }

  visitPage(event, newPage) {
    this.setState({
      page: newPage
    })
  }

  jumpBack() {
    const { page } = this.state;
    this.setState({
      page: page - 3
    })
  }

  jumpForward() {
    const { page } = this.state;
    this.setState({
      page: page + 3
    })
  }

  getOptions() {
    const { drinks } = this.state;
    const names = drinks.map(drink => drink.name).filter(Boolean);
    return [...new Set(names)].sort((a, b) => a.localeCompare(b));
  }

  renderDrinks() {
    const {
      dateRange,
      drink,
      error,
      perDay,
      total,
      drinks,
      page,
    } = this.state;

    return (
      <div className="row">
        { error }
        <div className="column">
          <DrinkForm
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleDrinkInputChange}
            drink={drink}
            error={error}
            options={this.getOptions()}
          />
        </div>
        <div className="column">
          <DrinkList
            drinks={this.paginatedDrinks()}
            perDay={perDay}
            total={total}
            handleInputChange={this.handleDateInputChange}
            dateRange={dateRange}
            handleSortingFormSubmit={this.handleSortingFormSubmit}
            handleDeleteDrink={this.handleDeleteDrink}
          />
          <Pagination
            drinks={drinks}
            page={page}
            previousPage={this.previousPage}
            nextPage={this.nextPage}
            lastPage={this.lastPage}
            firstPage={this.firstPage}
            pages={this.getPages()}
            visitPage={this.visitPage}
            jumpBack={this.jumpBack}
            jumpForward={this.jumpForward}
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
