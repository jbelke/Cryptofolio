import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  Icon,
} from 'semantic-ui-react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sidebarLeftOverlay = props => (
  <Aux>
    <Backdrop
      clicked={props.clicked}
      visible={props.visible}
    />
    <Sidebar.Pushable as={Aux}>
      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        visible={props.visible}
        icon="labeled"
        vertical
        inverted
      >
        <Menu.Item
          name="home"
          as={Link}
          to="/home"
          onClick={props.clicked}
        >
          <Icon name="home" />
          Home
        </Menu.Item>

        <Menu.Item
          name="coins"
          as={Link}
          to="/coins"
          onClick={props.clicked}
        >
          <Icon name="bitcoin" />
            Coins
        </Menu.Item>

        <Menu.Item
          name="signup"
          as={Link}
          to="/signup"
          onClick={props.clicked}
        >
          <Icon name="sign in" />
          SignIn
        </Menu.Item>

      </Sidebar>

      <Sidebar.Pusher>
        {props.children}
      </Sidebar.Pusher>

    </Sidebar.Pushable>
  </Aux>
);

sidebarLeftOverlay.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.shape({}).isRequired,
  clicked: PropTypes.func.isRequired,
};

sidebarLeftOverlay.defaultProps = {
  visible: null,
};

export default sidebarLeftOverlay;
