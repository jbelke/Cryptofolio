import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../Aux/Aux';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/Navigation/SideBar/SideBar';

class Layout extends Component {
  state = {
    visible: false,
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    return (
      <Aux>
        <Toolbar
          clicked={() => this.toggleVisibility()}
        />
        <SideBar
          clicked={() => this.toggleVisibility()}
          visible={this.state.visible}
        >
          {this.props.children}
        </SideBar>
        <Footer />
      </Aux>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};


export default Layout;
