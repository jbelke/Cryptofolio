import React from 'react';
import { Icon, Grid } from 'semantic-ui-react';
import classes from './Footer.scss';

const footer = () => (
  <footer className={classes.Footer}>
    <Grid centered>
      <p>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/tomtrasmontero/Cryptofolio">
          <Icon inverted name="github" size="big" />Made by TT 2018
        </a>
      </p>
    </Grid>
  </footer>
);

export default footer;
