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
    const options = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }

    fetch("http://localhost:8000/drinks", options)
      .then(res => res.json())
      .then(
        drinks => this.setState({ loading: false, drinks }),
        error => this.setState({ loading: false, error })
      );


      /// I am not sure this handles errors very well
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
      oz = data.get("oz"),
      percent = data.get("percent"),
      imbibedOn = data.get("imbibedOn");

      if ([oz, percent, imbibedOn].includes("")) {
        this.setState({ error: "Please fill out all fields" })
        return
      }

      var params = {
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
    }).then(response => response.json())
      .then(data => this.setState({ drinks: [...this.state.drinks, data] }))
      .catch(error => this.setState({ error }));
  }

  /// this also does not handle errors well

  renderDrinks() {
    return (
      <div>
        { this.state.error }
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
