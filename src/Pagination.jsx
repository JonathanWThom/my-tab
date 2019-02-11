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
    let moreRight;
    let moreLeft;
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
          className="cursor-pointer float-left purple margin-right-10"
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
          className="cursor-pointer float-right purple margin-right-10"
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
      let start = 0;
      let range = pages;

      if (pages > 6) {
        start = page - 3;
        if (start < 1) {
          start = 0
        }
        range = start + 5;
        const last = start + range;

        if (last > pages) {
          const more = start + range - pages;
          range = pages - 1;
          if (range < 6) {
            start = start - more + 1;
          }
        }

        if (start > 0) {
          moreLeft = <span>...</span>
        }

        if (pages > last) {
          moreRight = <span>...</span>
        }
      }

      for (let i = start; i <= range; i++) {
        const p = i + 1;
        let content;

        if (p === page) {
          content = (
            <span className="margin-horizontal-2" key={p}>
              {p}
            </span>
          )
        } else {
          content = (
            <span
              key={p}
              onClick={(e) => visitPage(e, p)}
              className="cursor-pointer purple margin-horizontal-2"
            >
              {p}
            </span>
          )
        }
        pageNumbers.push(content)
      }
    }

    return(
      <div className="text-align-center">
        <div className="position-absolute">
          {first}
          {previous}
        </div>
        <span className="position-absolute">
          {moreLeft}
          {pageNumbers}
          {moreRight}
        </span>
        <div>
          {last}
          {next}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>{this.getPagination()}</div>
    )
  }
}
