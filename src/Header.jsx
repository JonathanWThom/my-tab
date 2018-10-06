import React from "react";
import Logout from "./Logout";
import PropTypes from "prop-types";

const Header = (props) => {
  const {
    invalidateToken,
  } = props;

  if (invalidateToken) {
    return (
      <div className="header text-align-right">
        <h3 className="float-left">My Tab</h3>
        <Logout invalidateToken={invalidateToken} />
      </div>
    );
  } else {
    return (
      <div className="header text-align-left">
        <h3>My Tab</h3>
      </div>
    );
  }
};

Header.propTypes = {
  invalidateToken: PropTypes.func,
};

export default Header;
