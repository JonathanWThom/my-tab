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
    let pageNumbers = [];
    const {
      drinks,
      page,
      previousPage,
      nextPage,
      lastPage,
      firstPage,
      pages,
      visitPage
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

    if (pages > 1) {
      for (let i = 0; i < pages; i++) {
        const p = i + 1;
        let content;

        if (p === page) {
          content = <span key={p}>{p}</span>
        } else {
          content = (
            <span key={p} onClick={(e) => visitPage(e, p)} className="cursor-pointer purple">
              {p}
            </span>
          )
        }
        pageNumbers.push(content)
      }
    }

    return(
      <div>
        {first}
        {previous}
        {pageNumbers}
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
