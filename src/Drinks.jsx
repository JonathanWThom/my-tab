import React, { Component } from "react";
import moment from "moment";
import utils from "./utils";
import DrinkForm from "./DrinkForm.jsx";
import DrinkList from "./DrinkList.jsx";
import Pagination from "./Pagination";

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
      page: 1,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSortingFormSubmit = this.handleSortingFormSubmit.bind(this);
    this.handleDeleteDrink = this.handleDeleteDrink.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.getPages = this.getPages.bind(this);
    this.visitPage = this.visitPage.bind(this);
    this.jumpBack = this.jumpBack.bind(this);
    this.jumpForward = this.jumpForward.bind(this);
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

  renderDrinks() {
    const {
      error,
      oz,
      percent,
      imbibedOn,
      perDay,
      total,
      firstDate,
      lastDate,
      drinks,
      page,
    } = this.state;

    return (
      <div className="row">
        { error }
        <div className="column">
          <DrinkForm
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            oz={oz}
            percent={percent}
            imbibedOn={imbibedOn}
            error={error}
          />
        </div>
        <div className="column">
          <DrinkList
            drinks={this.paginatedDrinks()}
            perDay={perDay}
            total={total}
            handleInputChange={this.handleInputChange}
            firstDate={firstDate}
            lastDate={lastDate}
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
