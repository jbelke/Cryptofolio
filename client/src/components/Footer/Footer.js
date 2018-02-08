import React from 'react';
import { Icon } from 'semantic-ui-react';
import classes from './Footer.scss';

const footer = () => (
  <footer>
    <div className={classes.Footer} >
      <p><Icon inverted color="yellow" name="bitcoin" size="large" />Made by TT 2018</p>
    </div>
  </footer>
);

export default footer;
