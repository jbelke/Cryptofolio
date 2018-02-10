import React, { Component } from 'react';

class Coin extends Component {
  state = {
    coin: {},
  }

  render() {
    return (
      <div>
        <p>Coin here: {this.state.coin}</p>
      </div>
    );
  }
}

export default Coin;
