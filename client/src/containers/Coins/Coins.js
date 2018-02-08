import React, { Component } from 'react';
import { Grid, Container, Segment } from 'semantic-ui-react';

class Coins extends Component {
  state = {
    topTenCoins: [
      {
        id: 1, coinName: 'btc', price: 45, symbol: 'BTC',
      },
      {
        id: 2, coinName: 'btc2', price: 44, symbol: 'BTC2',
      },
      {
        id: 3, coinName: 'btc3', price: 455, symbol: 'BTC3',
      },
      {
        id: 4, coinName: 'btc4', price: 455, symbol: 'BTC4',
      },
    ],
  }


  render() {
    const coins = (
      <Grid stackable={2}>
        {this.state.topTenCoins.map(coin => (
          <Grid.Column
            key={coin.id}
            mobile={16}
            computer={4}
          >
            <Segment>
              <p>{coin.coinName}</p>
              <p>Price: {coin.price}</p>
            </Segment>
          </Grid.Column>
        ))}
      </Grid>
    );

    return (
      <Container>
        {coins}
      </Container>
    );
  }
}

export default Coins;
