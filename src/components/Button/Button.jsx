import React from "react";
import PropTypes from "prop-types";
import { LoadButton } from "./Button.styled";

function Button(p) {
  return (
    <LoadButton type="button" onClick={p.onClick}>
      Load more
    </LoadButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
