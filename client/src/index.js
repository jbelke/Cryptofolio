import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Aux from './hoc/Aux/Aux';
import Footer from './components/Footer/Footer';

const app = (
  <Aux>
    <App />
    <Footer />
  </Aux>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
