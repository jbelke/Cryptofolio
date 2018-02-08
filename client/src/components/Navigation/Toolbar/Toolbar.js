import React, { Component } from 'react';
import { Menu, Responsive } from 'semantic-ui-react';
import classes from './Toolbar.scss';
import Aux from '../../../hoc/Aux/Aux';

class Toolbar extends Component {
  state = {
    activeItem: 'home',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    const toolbar = (
      // <Responsive>
      //   <Menu
      // </Responsive>
      <Menu pointing secondary size="massive" className={classes.Toolbar}>
        <Responsive
          as={Menu.Item}
          maxWidth={499}
          name="Menu"
          active={activeItem === 'menu'}
          onClick={this.handleItemClick}
        />
        <Responsive
          as={Menu.Item}
          minWidth={500}
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Responsive
          as={Menu.Item}
          minWidth={500}
          position="right"
          name="logout"
          active={activeItem === 'logout'}
          onClick={this.handleItemClick}
        />
      </Menu>
    );

    return (
      <Aux>
        { toolbar }
      </Aux>
      // <Menu pointing secondary size="massive" className={classes.Toolbar}>
      //   <Responsive
      //     as={Menu.Item}
      //     maxWidth={499}
      //     name="menu"
      //     active={activeItem === 'menu'}
      //     onClick={this.handleItemClick}
      //   />
      //   <Responsive
      //     as={Menu.Item}
      //     minWidth={500}
      //     name="home"
      //     active={activeItem === 'home'}
      //     onClick={this.handleItemClick}
      //   />
      //   <Responsive
      //     as={Menu.Item}
      //     minWidth={500}
      //     position="right"
      //     name="logout"
      //     active={activeItem === 'logout'}
      //     onClick={this.handleItemClick}
      //   />
      // </Menu>
    );
  }
}

export default Toolbar;
