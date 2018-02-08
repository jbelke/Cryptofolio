import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';
import HomePage from './containers/HomePage/HomePage';
import Coins from './containers/Coins/Coins';

class App extends Component {
  componentDidMount() {
    console.log('component App is mounted');
  }

  render() {
    const routes = (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/coins" exact component={Coins} />
        <Redirect to="/" />
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
