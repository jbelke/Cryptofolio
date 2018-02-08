import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Aux from './hoc/Aux/Aux';
import Footer from './components/Footer/Footer';
import Toolbar from './components/Navigation/Toolbar/Toolbar';

const app = (
  <Aux>
    <Toolbar />
    <App />
    <Footer />
  </Aux>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
