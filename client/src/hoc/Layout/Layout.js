import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../Aux/Aux';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import * as actions from '../../store/actions/index';


class Layout extends Component {
  state = {
    visible: false,
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  logout = () => {
    this.toggleVisibility();
    this.props.logout();
  }

  render() {
    return (
      <Aux>
        <Toolbar
          clicked={() => this.toggleVisibility()}
        />
        <SideBar
          clicked={() => this.toggleVisibility()}
          visible={this.state.visible}
          logout={() => this.logout()}
          isAuthenticated={this.props.authenticated}
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
  logout: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.authLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
