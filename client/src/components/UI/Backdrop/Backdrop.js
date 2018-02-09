import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.scss';

const backdrop = (props) => {
  const background = (
    <div
      className={classes.Backdrop}
      onClick={props.clicked}
      aria-hidden
    />
  );

  return props.show ? background : null;
};

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default backdrop;
