import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';

import HomePage from './containers/HomePage/HomePage';
import Coins from './containers/Coins/Coins';
import Coin from './containers/Coins/Coin/Coin';

class App extends Component {
  componentDidMount() {
    console.log('component App is mounted');
  }

  render() {
    const routes = (
      <Switch>
        <Route path="/home" exact component={HomePage} />
        <Route path="/coins" exact component={Coins} />
        <Route path="/coins/detail/:coinSymbol" component={Coin} />
        <Redirect to="/home" />
      </Switch>
    );

    return (
      <Aux>
        <Layout>
          {routes}
        </Layout>
      </Aux>
    );
  }
}


export default withRouter(App);
