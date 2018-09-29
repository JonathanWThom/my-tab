import React from "react";
import PropTypes from "prop-types";

const DrinkForm = (props) => {
  const {
    handleSubmit, oz, handleInputChange, percent, imbibedOn,
  } = props;

  return (
    <div>
      <h4>Add Drink</h4>
      <form id="drink-form" onSubmit={handleSubmit}>
        <label name="oz">Ounces</label>
        <input
          value={oz}
          onChange={handleInputChange}
          name="oz"
          type="number"
          step="0.01"
        />
        <br />
        <label name="percent">Percent</label>
        <input
          value={percent}
          onChange={handleInputChange}
          name="percent"
          type="number"
          step="0.01"
        />
        <br />
        <label name="imbibedOn">Imbibed On</label>
        <input
          value={imbibedOn}
          onChange={handleInputChange}
          type="date"
          name="imbibedOn"
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
