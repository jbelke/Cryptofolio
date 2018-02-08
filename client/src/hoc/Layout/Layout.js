import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../Aux/Aux';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  render() {
    return (
      <Aux>
        <Toolbar />
        {this.state.showSideDrawer}
        <main>
          {this.props.children}
        </main>
        <Footer />
      </Aux>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Layout;
