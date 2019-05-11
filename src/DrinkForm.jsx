import React from "react";
import PropTypes from "prop-types";
import utils from "./utils";

const DrinkForm = (props) => {
  const { handleSubmit, handleInputChange, drink, options } = props;
  const { oz, percent, imbibedOn, name } = drink;

  const datalist =
    options.map(option => {
      return <option key={option}>{option}</option>
    })

  return (
    <div>
      <h4>Add Drink</h4>
      <form id="drink-form" onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          type="text"
          name="name"
          list="names"
          value={name}
          onChange={handleInputChange}
        />
        <datalist id="names">
          {datalist}
        </datalist>
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
          value={imbibedOn}
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
  drink: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DrinkForm;
