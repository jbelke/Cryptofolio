import React from 'react';
import { Icon } from 'semantic-ui-react';
import classes from './Footer.scss';

const footer = () => (
  <footer className={classes.Footer}>
    <div>
      <p>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/tomtrasmontero/Cryptofolio">
          <Icon inverted name="github" size="big" />Made by TT 2018
        </a>
      </p>
    </div>
  </footer>
);

export default footer;
