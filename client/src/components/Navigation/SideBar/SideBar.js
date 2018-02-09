import React from 'react';
import PropTypes from 'prop-types';
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
          <Menu.Item name="home">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item name="gamepad">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item name="camera">
            <Icon name="camera" />
            Channels
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
};

SidebarLeftOverlay.defaultProps = {
  visible: false,
};

export default SidebarLeftOverlay;
