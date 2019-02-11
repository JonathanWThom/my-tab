import React, { Component } from "react";
import "./Pagination.css";

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
      let end = pages;

      if (pages > 6) {
        end = page + 3;
        start = page - 4;

        if (start < 0) {
          const diff = Math.abs(start);
          start = start + diff;
          end = end + diff
        }

        if (end > pages) {
          const sub = end - pages;
          end = end - sub;
          start = start - sub;
        }

        if (start > 0) {
          moreLeft = <span>...</span>
        }

        if (pages > end) {
          moreRight = <span>...</span>
        }
      }

      for (let i = start; i < end; i++) {
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
      <div className="text-align-center pagination">
        <span className="left">
          {first}
          {previous}
        </span>
        <span className="center">
          {moreLeft}
          {pageNumbers}
          {moreRight}
        </span>
        <span className="right">
          {last}
          {next}
        </span>
      </div>
    )
  }

  render() {
    return (
      <div>{this.getPagination()}</div>
    )
  }
}
