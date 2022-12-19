import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
});
