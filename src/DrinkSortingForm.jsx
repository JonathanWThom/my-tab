import React from "react";

const DrinkSortingForm = (props) => {
  const { dateRange, handleInputChange, handleSortingFormSubmit } = props;
  const { start, end } = dateRange;

  return(
    <div>
      <form onSubmit={handleSortingFormSubmit}>
        <div className="row">
          <div className="column">
            <input
              type="date"
              value={start}
              onChange={handleInputChange}
              name="start"
            />
          </div>
          <div className="column">
            <input
              type="date"
              value={end}
              onChange={handleInputChange}
              name="end"
            />
          </div>
          <div className="column">
            <input type="submit" value="Update Range" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default DrinkSortingForm;
