import React from "react";
import PropTypes from "prop-types";
import utils from "./utils";
import moment from "moment";

const DrinkForm = (props) => {
  const {
    handleSubmit, oz, handleInputChange, percent, imbibedOn,
  } = props;
  const dateValue = imbibedOn || utils.formatForInput(moment.utc());;

  return (
    <div>
      <h4>Add Drink</h4>
      <form id="drink-form" onSubmit={handleSubmit}>
        <input
          value={oz}
          onChange={handleInputChange}
          name="oz"
          type="number"
          step="0.01"
          placeholder="Ounces"
        />
        <br />
        <input
          value={percent}
          onChange={handleInputChange}
          name="percent"
          type="number"
          step="0.01"
          placeholder="Percent"
        />
        <br />
        <input
          value={dateValue}
          onChange={handleInputChange}
          type="date"
          name="imbibedOn"
          placeholder="Imbibed On"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

DrinkForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  oz: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  percent: PropTypes.string.isRequired,
  imbibedOn: PropTypes.string.isRequired,
};

export default DrinkForm;
