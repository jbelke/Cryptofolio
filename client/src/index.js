import React from 'react';
import ReactDOM from 'react-dom';
// import { compose, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Aux from './hoc/Aux/Aux';

const app = (
  <Aux>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Aux>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
