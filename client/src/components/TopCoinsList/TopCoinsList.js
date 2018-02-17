import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './TopCoinsList.scss';

class TopCoinsList extends Component {
  render() {
    const list = this.props.topCoins.map(coin => (
      <Grid.Column
        key={coin.id}
      >
        <Link to={`/coins/detail/${coin.symbol}`}>
          <Segment raised className={classes.Coin} >
            <p>Rank: {coin.rank}</p>
            <p>Symbol: {coin.symbol}</p>
            <p>{coin.name}</p>
            <p>Price: {coin.price_usd}</p>
          </Segment>
        </Link>
      </Grid.Column>
    ));
    return list;
  }
}

// PropTypes here
TopCoinsList.propTypes = {
  topCoins: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TopCoinsList;
