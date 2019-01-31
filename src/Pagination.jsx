import React, { Component } from "react";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  getPagination() {
    let previous;
    let next;
    const { drinks, page, previousPage, nextPage } = this.props;

    if (page !== 1) {
      previous = (
        <div
          onClick={previousPage}
          className="cursor-pointer float-left purple"
          >
          Previous
        </div>
      )
    }

    const showNext = drinks.length > (page * 10);

    if (showNext) {
      next = (
        <div
          onClick={nextPage}
          className="cursor-pointer float-right purple"
          >
          Next
        </div>
      )
    }

    return(
      <div>
        {previous}
        {next}
      </div>
    )
  }

  render() {
    return (
      <div>{this.getPagination()}</div>
    )
  }
}
