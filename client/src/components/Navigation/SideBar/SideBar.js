import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  Icon,
} from 'semantic-ui-react';
import Aux from '../../../hoc/Aux/Aux';

const SidebarLeftOverlay = (props) => {
  const { visible } = props;
  return (
    <Aux>
      <Sidebar.Pushable as={Aux}>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          visible={visible}
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
            name="login"
            as={Link}
            to="/singin"
            onClick={props.clicked}
          >
            <Icon name="sign in" />
            LogIn
          </Menu.Item>

        </Sidebar>

        <Sidebar.Pusher>
          {props.children}
        </Sidebar.Pusher>

      </Sidebar.Pushable>
    </Aux>
  );
};

SidebarLeftOverlay.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.shape({}).isRequired,
  clicked: PropTypes.func.isRequired,
};

SidebarLeftOverlay.defaultProps = {
  visible: false,
};

export default SidebarLeftOverlay;
