import React, { Component } from 'react';
import { Menu, Responsive, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Aux/Aux';

class Toolbar extends Component {
  state = {
    activeItem: '',
  };

  componentDidMount = () => {
    const activeAddress = this.props.history.location.pathname.split('/')[1];
    this.setState({ activeItem: activeAddress });
  }

  handleItemClick = (e, data) => {
    this.setState({ activeItem: data.name });
    this.props.history.push(data.address);
  };


  render() {
    const { activeItem } = this.state;
    const toolbar = (
      <Menu pointing secondary size="massive">
        <Responsive
          as={Menu.Item}
          maxWidth={499}
          name="menu"
          onClick={this.props.clicked}
          icon
        >
          <Icon size="large" name="ellipsis vertical" />
        </Responsive>
        <Responsive
          address="/"
          as={Menu.Item}
          minWidth={500}
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Responsive
          address="/coins"
          as={Menu.Item}
          minWidth={500}
          name="coins"
          active={activeItem === 'coins'}
          onClick={this.handleItemClick}
        />
        <Responsive
          address="/signup"
          as={Menu.Item}
          minWidth={500}
          position="right"
          name="signin"
          active={activeItem === 'signin'}
          onClick={this.handleItemClick}
        />
      </Menu>
    );

    return (
      <Aux>
        { toolbar }
      </Aux>
    );
  }
}

Toolbar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  clicked: PropTypes.func.isRequired,
};

export default withRouter(Toolbar);
