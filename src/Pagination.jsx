import React, { Component } from "react";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  getPagination() {
    let previous;
    let next;
    let last;
    let first;
    const {
      drinks,
      page,
      previousPage,
      nextPage,
      lastPage,
      firstPage
    } = this.props;

    if (page !== 1) {
      previous = (
        <div
          onClick={previousPage}
          className="cursor-pointer float-left purple"
          >
          Previous
        </div>
      )

      first = (
        <div
          onClick={firstPage}
          className="cursor-pointer float-left purple"
          >
          First
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

      last = (
        <div
          onClick={lastPage}
          className="cursor-pointer float-right purple"
          >
          Last
        </div>
      )
    }

    return(
      <div>
        {first}
        {previous}
        {last}
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
